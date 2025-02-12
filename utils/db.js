import mongoose from 'mongoose'

const connection = async () =>{
    try {
        
    await mongoose.connect('mongodb+srv://kalamala2004:kalamala2004@cluster0.8nqby.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log("database connected");
        
    } catch (error) {
        console.log(error);
    }
}

export default connection;