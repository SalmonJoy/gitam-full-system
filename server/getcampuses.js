export async function get_campus(client){
    await client.connect();
    let database = client.db("gitam_system")
    let courses = database.collection("campus")
    let cursor = await courses.find({}).toArray()
    // console.log(cursor)
    // await client.close();
    return cursor
  }

