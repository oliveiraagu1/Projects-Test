import mongoose from "mongoose"

export async function connect() {
    try {
        await mongoose.connect('mongodb+srv://gustavofloripa98:9EFSHDr8ZDdtrRYT@cluster0.yadpm1n.mongodb.net/hero-tickets');
        
        console.log('Connect database success')
    } catch (err) {
        console.log('Error connecting db', err)
    }
}