import db from "../database/db.js"; 

async function setIntervalSessionsDelete(){
    
        const sessions = await db.collection('sessions').find().toArray()
        const time = Date.now() - (2 * 60 * 60 * 1000)
    
        sessions.map((e) => {
            if (e.time <= time){
                db.collection('sessions').deleteOne({_id: e._id})
            }
        })
}

export {setIntervalSessionsDelete}
