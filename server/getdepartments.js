export async function get_departments(client){
    await client.connect();
    let database = client.db("gitam_system")
    let courses = database.collection("departments")
    let cursor = await courses.find({}).toArray()
    // console.log(cursor)
    // await client.close();
    return cursor
  }