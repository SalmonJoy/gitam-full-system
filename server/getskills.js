export async function get_skills(client, course_id){
    let skill_id
    await client.connect();
    let skill_array = []
    let database = client.db("gitam_system")
    let skill_collection = database.collection("skills")
    let course_skill_collection = database.collection("course_skill_mapping")
    let skill_name = await skill_collection.find({}).toArray()
    if(course_id==null || course_id==""){
      
      skill_array = skill_name
    }
    else{
      skill_id = await course_skill_collection.find({course_id:course_id}).toArray()
      skill_id.map((item1)=>{
        skill_name.map((item2)=>{
          if(item1.skill_id==item2.id){
          skill_array.push(item2)
          }
        })
      })
    }
    
   
    console.log(skill_array)
    // console.log(skill_id)
    // console.log(skill_name)
    
    return skill_array
  }