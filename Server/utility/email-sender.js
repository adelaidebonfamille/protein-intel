require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectUri = "https://developers.google.com/oauthplayground/";
const refreshToken = process.env.REFRESH_TOKEN;

const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
);

oauth2Client.setCredentials({
    refresh_token: refreshToken,
});

const getAccessToken = () =>
    new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                console.log(err);
                reject("Failed to create access token");
            }
            resolve(token);
        });
    });

const run = async(emailContent) => {
    const accessToken = await getAccessToken();
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "intelunsri17@gmail.com",
            accessToken,
            clientId: clientId,
            clientSecret: clientSecret,
            refreshToken: refreshToken,
        },
    });

    await transporter.sendMail(emailContent);
};

module.exports = run;