import Comments from '../model/comments.js'
import client from '../utils/redis_client.js'
// import cache from '../controllers/Cache-manager_keyv.js'

export const findbyid =  async (req, res) => {
    try {
      const id = req.params.id;
      console.log(`${id}`);
      const cacheData = await client.get(id);
  
      if (cacheData) {
        return res.status(200).send({
          mes: `Retrieved ${id} from cache`,
          data: JSON.parse(cacheData)
        });
      } else {

        console.log("Data not cached yet");
        const element =  await Comments.findOne({id:id});
        console.log("yeh nahi chala", element);
        
        if (element) {
          const data = element.name;
  
          await client.setEx(id, 1440, JSON.stringify(data));
          // await client.set(id, JSON.stringify(data));
  
          return res.status(200).send({
            mes: `Retrieved ${id} from server`,
            data: data
          });
        } else {
          return res.status(404).send({
            mes: `No data found with id=${id}`,
          });
        }
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send({
        mes: "Internal Server Error",
      });
    }


    // try {
    //   const id = req.params.id;
    //   console.log(`${id}`);
    //   const cacheData = await cache.get(id);
  
    //   if (cacheData) {
    //     return res.status(200).send({
    //       mes: `Retrieved ${id} from cache`,
    //       data: JSON.parse(cacheData)
    //     });
    //   } else {

    //     console.log("Data not cached yet");
    //     const element =  await Comments.findOne({id:id});
        
    //     if (element) {
    //       const data = element.name;
  
    //       await cache.set(id, JSON.stringify(data));
  
    //       return res.status(200).send({
    //         mes: `Retrieved ${id} from server`,
    //         data: data
    //       });
    //     } else {
    //       return res.status(404).send({
    //         mes: `No data found with id=${id}`,
    //       });
    //     }
    //   }
    // } catch (err) {
    //   console.error(err);
    //   return res.status(500).send({
    //     mes: "Internal Server Error",
    //   });
    // }
  }


  export const addComment = async (req, res, next) => {
      const data = req.body;
      data.id = Math.ceil(Math.random()*10000000000)
      console.log(data);
      const comment=  new Comments(data)
      try {
        await comment.save();
        res.send(JSON.stringify(comment));
    } catch (error) {
        console.error(error);
        next(error)
    }
  }


  export const deleteComment = async (req, res, next)=>{
    const id = req.params.id;
    try {
      await Comments.deleteOne({id: id});
      res.status(200).send({msg:"data deleted"})
    } catch (error) {
      next(error)
    }

  }


  export const updateComment = async(req, res, next)=>{
    const id=req.params.id;
    update= req.body;
    try {
      await Comments.findOneAndUpdate({id: id}, update, {
        new: true
      });
      
    } catch (error) {
      next(error)
    }
  }


  export const getAll = async (req, res, next) =>{
    try {
      const data=await Comments.find();
      res.send(data);
    } catch (error) {
      next(error)
    }
  } 
