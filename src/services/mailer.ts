import nodemailer from "nodemailer";
import hbs, {
  NodemailerExpressHandlebarsOptions,
} from "nodemailer-express-handlebars";
import path from "path";

export const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3b91e5798f98f0",
    pass: "490150d50aa310",
  },
});

export const mailOptions = (to: string, subject: string, text: string) => {
  return {
    from: "kenziemarket@kenziemarket.com",
    to,
    subject,
    text,
  };
};

export const mailTemplateOptions = (
  to: string,
  subject: string,
  template: string,
  context: any
) => {
  return {
    from: "kenziemarket@kenziemarket.com",
    to,
    subject,
    template,
    context,
  };
};

export const createEmail = (to: string, text: string, subject: string) => {
  const email = mailOptions(to, text, subject);

  transporter.sendMail(email, function (error: any, info: any) {
    if (error) {
      return console.log(error);
    }
    console.log("Message enviada: " + info.response);
  });

  return email;
};

export const sendSellEmail = async (
  email: string,
  name: string,
  date: Date,
  products: object[],
  totalPrice: number
) => {
  const subject = "Realização de compra KenzieMarket";

  const handlebarOptions: NodemailerExpressHandlebarsOptions = {
    viewEngine: {
      partialsDir: path.resolve(__dirname, "..", "templates"),
      defaultLayout: undefined,
    },
    viewPath: path.resolve(__dirname, "..", "templates"),
  };

  transporter.use("compile", hbs(handlebarOptions));

  const message = mailTemplateOptions(email, subject, "email", {
    name,
    date,
    products,
    totalPrice,
  });

  transporter.sendMail(message, function (error: any, info: any) {
    if (error) {
      return console.log(error);
    }
    console.log("Message enviada: " + info.response);
  });
};
