import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
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
  },
}));
const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
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
  const [isCompany, setIscompany] = useState(false);
  const classes = useStyles();
  const initialChildren = JSON.parse(localStorage.getItem("experiences")) | [];
  const regex = /^((\x2B237)?6)([0-9]{8})$/gm;
  return (
    <Card>
      <CardContent>
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
            await sleep(3000);
          }}
        >
          <FormikStep
            validationSchema={
              isCompany
                ? object({
                    email: string().email().required(),
                    phonenumber: string().required(),
                    companyName: string().required(),
                    activity: string().required(),
                  })
                : object({
                    firstName: string().required().min(2),
                    lastName: string().required().min(2),
                    email: string().email().required(),
                    phonenumber: string()
                      .required()
                      /** validation d'un numero Camerounais */
                      .matches(
                        regex,
                        "ce numero n'est pas valide pour le cameroun"
                      )
                      .length(
                        13,
                        "ce numero n'est pas valide pour le cameroun"
                      ),
                    job: string().required(),
                  })
            }
            label="A propos de vous"
          >
            <Grid container md={12}>
              <Grid item md={5} className={clsx([classes.root, "text-center"])}>
                <Paper
                  elevation={isCompany ? 0 : 3}
                  className={clsx([classes.card, !isCompany && classes.active])}
                  onClick={() => setIscompany(false)}
                >
                  Je suis un artisan
                </Paper>

                <Paper
                  elevation={isCompany ? 3 : 0}
                  className={clsx([classes.card, isCompany && classes.active])}
                  onClick={() => setIscompany(true)}
                >
                  Je represente une entreprise
                </Paper>
              </Grid>
              <AboutForm isCompany={isCompany} />
            </Grid>
          </FormikStep>
          <FormikStep
            label="vos competences"
            validationSchema={object({
              competences: array().min(
                1,
                "Vous devez ajouter au moins une competence"
              ),
            })}
          >
            <Competences />
            <Location />
          </FormikStep>
          <FormikStep
            label="Votre experience"
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
            label="Choisir un abonnement"
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
      </CardContent>
    </Card>
  );
}

export function FormikStep({ children }) {
  return <>{children}</>;
}

export function FormikStepper({ children, ...props }) {
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

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
          setStep((s) => s + 1);
        }
      }}
    >
      {({ isSubmitting, isValid }) => {
        const ColorlibConnector = withStyles({
          alternativeLabel: {
            top: 22,
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
        return (
          <Form autoComplete="off">
            <Stepper
              alternativeLabel
              activeStep={step}
              connector={<ColorlibConnector />}
            >
              {childrenArray.map((child, index) => {
                return (
                  <Step
                    key={child.props.label}
                    completed={step > index || completed}
                  >
                    <StepLabel
                      StepIconComponent={IconComponent}
                      error={!isValid && step === index}
                    >
                      {child.props.label}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <Container maxWidth={"md"} className="mt-5">
              {currentChild}
              <Grid
                container
                spacing={2}
                justify={"flex-end"}
                alignContent={"flex-end"}
              >
                {step > 0 ? (
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
                </Grid>
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
