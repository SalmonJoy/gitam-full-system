export async function get_programs(client){
    await client.connect();
    let database = client.db("gitam_system")
    let courses = database.collection("programs")
    let cursor = await courses.find({}).toArray()
    // console.log(cursor)
    // await client.close();
    return cursor
  }