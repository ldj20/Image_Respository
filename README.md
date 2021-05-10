# Image_Respository
This is Lawrence Jiang's Shopify Application.

After cloning the repository, you can run the server and client on two seperate terminal windows.

Before running anything, create a file named "dev.env" in the config folder. In that .env file: add this: 

DB_URL=mongodb+srv://lj-33:lIu1hECh4ULk7GMV@cluster0.a5ngj.mongodb.net/Cluster0?retryWrites=true&w=majority
SECRET=fndjsa9i43n

Then, on both the root and /frontend directory, run "npm install".

On the root directory, run "npm run dev" to start the server and on the /frontend directory, run "npm start" to start the client.