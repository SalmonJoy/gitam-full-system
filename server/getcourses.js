export async function get_courses(client){
    await client.connect();
    let database = client.db("gitam_system")
    let courses = database.collection("courses")
    let cursor = await courses.find({}).toArray()
    // console.log(cursor)
    // await client.close();
    return cursor
  }

