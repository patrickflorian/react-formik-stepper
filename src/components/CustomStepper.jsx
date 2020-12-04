import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Hidden,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { array, date, mixed, number, object, ref, string } from "yup";
import StepConnector from "@material-ui/core/StepConnector";
import clsx from "clsx";
import { Container } from "@material-ui/core";
import {
  Build,
  CreditCard,
  SupervisedUserCircle,
  Work,
  WorkTwoTone,
} from "@material-ui/icons";
import AboutForm from "./AboutForm";
import { Competences } from "./Competences";
import { Location } from "./Location";
import { ExperienceContainer } from "./experience/ExperienceContainer";
import { Suscription } from "./suscription/suscription";
import "../styles/style.css";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import CompanyForm from "./CompanyForm";
const sleep = (time) => new Promise((acc) => setTimeout(acc, time));
const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-flex",
    flexWrap: "wrap",
    justifyContent: "center",
    "& > *": {
      display: "flex",
      backgroundColor: "#ccc",
      margin: theme.spacing(1),
      height: theme.spacing(16),
      alignItems: "center",
      padding: theme.spacing(2),
      /* justify-content: center; */
      textAlign: "center",
      cursor: "pointer",
    },
  },
  active: {
    backgroundImage: " linear-gradient(to right, #000046, #1cb5e0)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    fontSize: 21,
    color: "white",
  },
  card: {
    width: 200,
    display: "flex",
    justifyContent: "center",
    "&:hover": {
      backgroundImage: " linear-gradient(to right, #000046, #1cb5e0)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
      fontSize: 21,
      color: "white",
    },
  },
}));
const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 30,
    height: 30,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage: " linear-gradient(to right, #000046, #1cb5e0)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage: " linear-gradient(to right, #fc4a1a, #f7b733)",
  },
  error: {
    backgroundImage: " linear-gradient(to right, #e52d27, #b31217)",
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
  label: {
    color: "#000000",
  },
});
export default function CustomStepper() {
  const [isCompany, setIscompany] = useState(null);
  const [currentStep, setStep] = useState(0);
  const classes = useStyles();
  const initialChildren = JSON.parse(localStorage.getItem("experiences")) | [];
  const regex = /^((\x2B237)?6)([0-9]{8})$/gm;
  useEffect(() => {
    if (isCompany != null) setStep((s) => s + 1);
  }, [isCompany, currentStep]);
  return (
    <FormikStepper
      initialValues={{
        firstName: "",
        lastName: "",
        competences: [],
        location: { country: {}, town: {}, quarter: {} },
        experiences: JSON.parse(initialChildren),
        money: 0,
        description: "",
      }}
      onSubmit={async () => {
        await sleep(10);
      }}
      currentStep={currentStep}
      setStep={setStep}
    >
      {/* <FormikStep label="A propos de vous">
            <Grid container md={12}>
              <Grid
                item
                md={12}
                className={clsx([classes.root, "text-center"])}
              >
                <Paper
                  elevation={isCompany ? 0 : 3}
                  className={clsx([
                    classes.card,
                    !isCompany && isCompany !== null && classes.active,
                  ])}
                  onClick={() => setIscompany(false)}
                >
                  Un artisan
                </Paper>

                <Paper
                  elevation={isCompany ? 3 : 0}
                  className={clsx([classes.card, isCompany && classes.active])}
                  onClick={() => setIscompany(true)}
                >
                  Une entreprise
                </Paper>
              </Grid>
            </Grid>
          </FormikStep>
           */}
      <FormikStep
        validationSchema={object({
          firstName: string().required().min(2),
          lastName: string().required().min(2),
          email: string().email().required(),
          phonenumber: string()
            .required()
            // validation d'un numero Camerounais
            .matches(regex, "ce numero n'est pas valide pour le cameroun")
            .length(13, "ce numero n'est pas valide pour le cameroun"),
          job: string().required(),
        })}
        onSubmit={async () => {
          await sleep(10);
          setStep((s) => s + 1);
        }}
      >
        <AboutForm />
      </FormikStep>
      <FormikStep
        validationSchema={object({
          competences: array().min(
            1,
            "Vous devez ajouter au moins une competence"
          ),
        })}
        onSubmit={async () => {
          await sleep(10);
          setStep((s) => s + 1);
        }}
      >
        <Competences />
      </FormikStep>
      <FormikStep
        validationSchema={object({
          email: string().email().required(),
          phonenumber: string().required(),
          companyName: string().required(),
          activity: string().required(),
        })}
        onSubmit={async () => {
          await sleep(10);
          setStep((s) => s + 1);
        }}
      >
        <CompanyForm />
      </FormikStep>
      <FormikStep
        onSubmit={async () => {
          await sleep(10);
          setStep((s) => s + 1);
        }}
      >
        <Location />
      </FormikStep>
      <FormikStep
        validationSchema={object().shape({
          experiences: array()
            .of(
              object().shape({
                begin_date: date()
                  .required("quand avez vous comencé?")
                  .nullable()
                  .transform((curr, orig) => (orig === "" ? null : curr)),
                end_date: date()
                  .required("quand avez-vous fini? ")
                  .test(
                    "compare date Values",
                    "toi meme tu as fini avant d'avoir commencer yaaaaha",
                    function (value) {
                      let beginDateValue = this.resolve(ref("begin_date"));
                      return beginDateValue < value;
                    }
                  )
                  .nullable()
                  .transform((curr, orig) => (orig === "" ? null : curr)),
                company: string()
                  .required("pour quelle entreprise travailliez vous? ")
                  .min(3, "au moins sur 3 caracteres "),
                description: string()
                  .required(
                    "donnez une description du travail effectué au sein de cette structure"
                  )
                  .min(3, "au moins sur 3 caracteres "),
                position: string()
                  .required("veuillez renseigner le poste occupé")
                  .min(3, "au moins sur 3 caracteres "),
              })
            )
            .required()
            .min(1, "Vous devez ajouter au moins une competence"),
        })}
        onSubmit={async () => {
          await sleep(10);
          setStep((s) => s + 1);
        }}
      >
        <Box
          paddingBottom={2}
          alignItems={"center"}
          justifyContent={"center"}
          display={"flex"}
        >
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <Box paddingBottom={2}>
                <Field
                  paddingBottom={2}
                  name="experiences"
                  component={ExperienceContainer}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </FormikStep>

      <FormikStep
        validationSchema={object({
          money: mixed().when("millionaire", {
            is: true,
            then: number()
              .required()
              .min(
                1_000_000,
                "Because you said you are a millionaire you need to have 1 million"
              ),
            otherwise: number().required(),
          }),
        })}
        onSubmit={async () => {
          await sleep(10);
          setStep((s) => s + 1);
        }}
      >
        <Box
          paddingBottom={2}
          alignItems={"center"}
          justifyContent={"center"}
          display={"flex"}
        >
          <Suscription />
        </Box>
      </FormikStep>
    </FormikStepper>
  );
}

export function FormikStep({ children }) {
  return <>{children}</>;
}

export function FormikStepper({ children, currentStep, setStep, ...props }) {
  const childrenArray = React.Children.toArray(children);
  const step = currentStep | 0;
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);
  const [switchState, setSwitch] = useState(false);
  function isLastStep() {
    return step === childrenArray.length - 1;
  }
  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          currentChild.props.onSubmit();
          //setStep((s) => s + 1);
        }
      }}
    >
      {({ isSubmitting, isValid, submitForm, touched, values }) => {
        localStorage.setItem("registration_stepper", JSON.stringify(values));
        const ColorlibConnectorVertical = withStyles({
          alternativeLabel: {
            position: "absolute",
            top: "calc(-92% + 24px)",
            position: "absolute",
            height: "calc(100% - 25px)",
            left: "auto",
            right: "auto",
          },
          active: {
            "& $line": {
              backgroundImage: " linear-gradient(to right,#f7b733, #000046)",
            },
          },
          completed: {
            "& $line": {
              backgroundImage: " linear-gradient(to right, #f7b733, #fc4a1a)",
            },
          },
          line: {
            width: 3,
            height: "100%",
            border: 0,
            backgroundColor: "#eaeaf0",
            borderRadius: 1,
          },
        })(StepConnector);

        const ColorlibConnectoHorizontal = withStyles({
          alternativeLabel: {
            //top: 22,
          },
          active: {
            "& $line": {
              backgroundImage: " linear-gradient(to right,#f7b733, #000046)",
            },
          },
          completed: {
            "& $line": {
              backgroundImage: " linear-gradient(to right, #f7b733, #fc4a1a)",
            },
          },
          line: {
            height: 3,
            border: 0,
            backgroundColor: "#eaeaf0",
            borderRadius: 1,
          },
        })(StepConnector);

        const Message = StepsMessages[step].Component;
        return (
          <Form autoComplete="off">
            <Container maxWidth={"md"} className="mt-5">
              <Hidden mdUp>
                <Grid container className="mb-3">
                  <Grid item md={12} sm={12} xs={12}>
                    <Stepper
                      alternativeLabel
                      activeStep={step}
                      connector={<ColorlibConnectoHorizontal />}
                      style={{ height: "100%" }}
                    >
                      {childrenArray.map((child, index) => {
                        return (
                          <Step
                            key={child.props.label}
                            completed={step > index || completed}
                            onClick={() => step >= index && setStep(index)}
                            style={{ cursor: "pointer" }}
                          >
                            <StepLabel
                              StepIconComponent={IconComponent}
                              error={!isValid && step === index}
                              defaultValue={index}
                            >
                              {child.props.label}
                            </StepLabel>
                          </Step>
                        );
                      })}
                    </Stepper>
                  </Grid>
                </Grid>
              </Hidden>
              <div className="row justify-content-center">
                <div className="col-sm-6 col-md-4 mt-4">
                  <SwitchTransition mode="out-in">
                    <CSSTransition
                      key={switchState}
                      timeout={1000}
                      addEndListener={(node, done) => {
                        node.addEventListener("transitionend", done, false);
                      }}
                      classNames="fade"
                    >
                      <div className="msg">
                        <Message />
                      </div>
                    </CSSTransition>
                  </SwitchTransition>
                </div>
                <Hidden smDown>
                  <div className="col-md-1 px-0">
                    <Stepper
                      alternativeLabel
                      activeStep={step}
                      connector={<ColorlibConnectorVertical />}
                      orientation="vertical"
                      style={{ height: "500px" }}
                    >
                      {childrenArray.map((child, index) => {
                        return (
                          <Step
                            key={child.props.label}
                            completed={step > index || completed}
                            onClick={() => step >= index && setStep(index)}
                            style={{ cursor: "pointer" }}
                          >
                            <StepLabel
                              StepIconComponent={IconComponent}
                              error={!isValid && step === index}
                              defaultValue={index}
                            >
                              {child.props.label}
                            </StepLabel>
                          </Step>
                        );
                      })}
                    </Stepper>
                  </div>
                </Hidden>
                <div className="col-sm-6 col-md-5 px-0 mt-4">
                  <SwitchTransition mode="out-in">
                    <CSSTransition
                      key={switchState}
                      timeout={2000}
                      addEndListener={(node, done) => {
                        node.addEventListener("transitionend", done, false);
                      }}
                      classNames="fade"
                    >
                      <div className="msg">{currentChild}</div>
                    </CSSTransition>
                  </SwitchTransition>
                  <Button
                    onClick={() => {
                      setSwitch((s) => !s);
                      submitForm();
                    }}
                  >
                    ok
                  </Button>
                </div>
              </div>

              <Grid
                container
                spacing={2}
                justify={"flex-end"}
                alignContent={"flex-end"}
              >
                {/* {step > 0 ? (
                  <Grid item>
                    <Button
                      disabled={isSubmitting}
                      variant="contained"
                      color="primary"
                      onClick={() => setStep((s) => s - 1)}
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #000046, #1cb5e0)",
                      }}
                    >
                      Back
                    </Button>
                  </Grid>
                ) : null}
                <Grid item> 
                  <Button
                    startIcon={
                      isSubmitting ? <CircularProgress size="1rem" /> : null
                    }
                    disabled={isSubmitting}
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{
                      backgroundImage: isValid
                        ? "linear-gradient(to right, #000046, #1cb5e0)"
                        : "linear-gradient(to right, #e52d27, #b31217)",
                    }}
                  >
                    {isSubmitting
                      ? "Submitting"
                      : isLastStep()
                      ? "Submit"
                      : "Next"}
                  </Button>
                </Grid>*/}
              </Grid>
            </Container>
          </Form>
        );
      }}
    </Formik>
  );
}

const IconComponent = (props) => {
  const classes = useColorlibStepIconStyles();
  const { active, completed, error } = props;

  const icons = {
    1: <SupervisedUserCircle />,
    2: <WorkTwoTone />,
    3: <Work />,
    4: <Build />,
    5: <CreditCard />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
        [classes.error]: error && active,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
};

const StepsMessages = [
  {
    Component: () => {
      return (
        <>
          <Typography variant={"h5"}>Hello Artisan !!!!</Typography>
          <Typography variant={"body1"}>
            Pour enrichir votre experience sur notre plateforme nous avons
            besoin que vous renseignez certaines informations concernant votre
            activité
          </Typography>
        </>
      );
    },
  },
  {
    Component: () => {
      return (
        <>
          <Typography variant={"h5"} className={"msg"}>
            Vos competences sont importantes !!!!
          </Typography>
          <Typography variant={"body1"} className={"msg"}>
            Pour benficier de l'assistance complete et specifique a vos
            activites ainsi que des offres vous correspondant il est important
            pour nous de connaitre vos competences
          </Typography>
        </>
      );
    },
  },
  {
    Component: () => {
      return (
        <>
          <Typography variant={"h5"}>Hello Artisan !!!!</Typography>
          <Typography variant={"body1"}>
            Pour enrichir votre experience sur notre plateforme nous avons
            besoin que vous renseignez certaines informations concernant votre
            activité
          </Typography>
        </>
      );
    },
  },
  {
    Component: () => {
      return (
        <>
          <Typography variant={"h5"} className={"msg"}>
            Où se situe votre activité !!!!
          </Typography>
          <Typography variant={"body1"} className={"msg"}>
            Pour benficier de l'assistance complete et specifique a vos
            activites ainsi que des offres vous correspondant il est important
            pour nous de connaitre vos competences
          </Typography>
        </>
      );
    },
  },
  {
    Component: () => {
      return (
        <>
          <Typography variant={"h5"} className={"msg"}>
            Vos experiences sont importantes !!!!
          </Typography>
          <Typography variant={"body1"} className={"msg"}>
            Pour benficier de l'assistance complete et specifique a vos
            activites ainsi que des offres vous correspondant il est important
            pour nous de connaitre vos competences
          </Typography>
        </>
      );
    },
  },
  {
    Component: () => {
      return (
        <>
          <Typography variant={"h5"} className={"msg"}>
            Choissisez un plan (facultatif)!!!!
          </Typography>
          <Typography variant={"body1"} className={"msg"}>
            Pour benficier de l'assistance complete et specifique a vos
            activites ainsi que des offres vous correspondant il est important
            pour nous de connaitre vos competences
          </Typography>
        </>
      );
    },
  },
];
