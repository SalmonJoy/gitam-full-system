export async function get_skills_pg(pgClient){
    const data = await pgClient.query('SELECT courses.id, courses.code, courses.name as cname, skills.name as name FROM courses inner join course_skill_mapping on courses.id = course_skill_mapping.course_id inner join skills on course_skill_mapping.skill_id = skills.id')
    return data
}