import mongoose from "mongoose";

const connectDB = async() => {
    try {
        mongoose.connection.on('connected', () => console.log("Database Connected"))
        await mongoose.connect('mongodb+srv://resto:MDPpc776@cluster0.ohw5n.mongodb.net/assignment')
    } catch (error) {
        console.error("DB connection error:", error.message);
    }
}
export default connectDB;