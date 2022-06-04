import dotenv from "dotenv"
dotenv.config();
const mongoose_user = process.env.MONGO_USER;
const mongoose_password = process.env.MONGO_PASSWORD;
const mongoose_uri = `mongodb+srv://${mongoose_user}:${mongoose_password}@cluster0.ih7ry.mongodb.net/Assinment?retryWrites=true&w=majority`;

const PORT = process.env.PORT ? Number(process.env.PORT) : 9900;

export const config = {
    mongo: {
        Url: mongoose_uri
    },
    server: {
        port: PORT
    }
}