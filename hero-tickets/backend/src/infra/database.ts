import mongoose from "mongoose"

export async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1');
        console.log('Connect database success')
    } catch (err) {
        console.log('Error connecting db', err)
    }
}