import React, { useEffect, useState } from 'react'
import "./Style.css"
export default function Filters() {

    const [campus_list, setCampus_list] = useState([{}])
    const [course_list, setCourse_list] = useState([{}])
    const [skill_list, setSkill_list] = useState([{}])
    const [school_list, setSchool_list] = useState([{}])
    const [department_list, setDepartment_list] = useState([{}])
    const [program_list, setProgram_list] = useState([{}])
    const [table_list, setTable_list] = useState([{}])

    const hierarchy = ["Campus", "School","Department","Degree","Courses","Skill"]

    const [selected, setSelected] = useState({
        campus:false,
        school:false,
        department:false,
        program:false,
        course:false
    })
    const defaultVal = "All subjects"

    let count = 0
    useEffect(() => {

        async function fetchCampus() {
            const response = await fetch(
                'http://localhost:3000/campuses/pg',
                {
                    method: "GET"
                });
            
            setCampus_list(await response.json());
            setTable_list(campus_list)
        }

        async function fetchSchools() {
            const response = await fetch(
                'http://localhost:3000/schools/pg',
                {
                    method: "GET"
                });
            setSchool_list(await response.json());
        }

        async function fetchCourses() {
            const response = await fetch(
                'http://localhost:3000/courses/pg',
                {
                    method: "GET"
                });
            let data = await response.json()
            setCourse_list(await data);
        }

        async function fetchSkills() {
            const response = await fetch(
                'http://localhost:3000/course_skill_mapping/pg',
                {
                    method: "GET"
                });
            let data = await response.json()
            setSkill_list(await data);
        }

        async function fetchDepartment() {
            const response = await fetch(
                'http://localhost:3000/departments/pg',
                {
                    method: "GET"
                });
            setDepartment_list(await response.json());
        }

        async function fetchProgram() {
            const response = await fetch(
                'http://localhost:3000/programs/pg',
                {
                    method: "GET"
                });
            setProgram_list(await response.json());
        }

        fetchCampus()
        fetchSchools();
        fetchCourses();
        fetchSkills();
        fetchDepartment()
        fetchProgram();
        console.log("object")

    }, [campus_list[0].name]);

    function populateSkill(event) {
        setSelected({...selected,course:true})
        async function fetchSkills() {
            // console.log(event.target.value)
            let url
            if (event.target.value == "All Courses") {
                // url = 'http://localhost:3000/skills'
                url = 'http://localhost:3000/course_skill_mapping/pg'
            }
            else {
                url = 'http://localhost:3000/skills?id=' + event.target.value
            }
            const response = await fetch(
                url,
                {
                    method: "GET"
                });
            let data = await response.json()
            setSkill_list(await data);
            setTable_list(await data)
            
        }

        fetchSkills();
        
        {console.log(table_list)}
    }

    function populateSchool(event) {
setSelected({...selected,campus:true})
setTable_list(school_list)


    }

    function populateDepartment(event) {
        setSelected({...selected,school:true})
        setTable_list(department_list)
    }

    function populateProgram(event) {
        setSelected({...selected,department:true})
        setTable_list(program_list)
    }

    function populateCourse(event) {
        setSelected({...selected,program:true})
        setTable_list(course_list)
    }






    return (
        <>
            <div className="d-flex justify-content-around top-filter">

                <div className="mx-3 my-5">
                    <select className="form-select" aria-label="Default select example" onChange={populateSchool}>
                        <option>All Campuses</option>
                        {campus_list.map((item) => (
                            <option value={item.id} key={parseInt(item.id)}>{item.name}</option>
                        ))
                        }
                    </select>
                </div>

                <div className="mx-3 my-5">
                    <select className="form-select" aria-label="Default select example" onChange={populateDepartment}>
                        <option>All Schools</option>
                        {school_list.map((item) => (
                            <option value={item.id} key={parseInt(item.id)}>{item.name}</option>
                        ))
                        }
                    </select>
                </div>

                <div className="mx-3 my-5">
                    <select className="form-select" aria-label="Default select example" onChange={populateProgram}>
                        <option>All Departments</option>
                        {department_list.map((item) => (
                            <option value={item.id} key={parseInt(item.id)}>{item.name}</option>
                        ))
                        }
                    </select>
                </div>

                <div className="mx-3 my-5">
                    <select className="form-select" aria-label="Default select example" onChange={populateCourse}>
                        <option>All Programs</option>
                        {program_list.map((item) => (
                            <option value={item.id} key={parseInt(item.id)}>{item.name}</option>
                        ))
                        }
                    </select>
                </div>

                <div className="mx-3 my-5">
                    <select className="form-select" aria-label="Default select example" onChange={populateSkill}>
                        <option>All Courses</option>
                        {course_list.map((item) => (
                            <option value={item.id} key={parseInt(item.id)}>{item.name}</option>
                        ))
                        }
                    </select>
                </div>





                {/* <div>
                    {
                        selected && <select className="form-select" aria-label="Default select example" onChange={updateMetrics}>
                            <option defaultValue={""}>Select the skills</option>
                            {skill_list.map((item) => (
                                <option value={item.name} key={parseInt(item.id)} >{item.name}</option>
                            ))
                            }
                        </select>
                    }
                </div> */}

            </div>


            <table className="table table-striped fixed-width-table">
                <thead>
                    <tr>
                        <th className = "col1" scope="col">Sr No.</th>
                        <th className = "col2" scope="col">Skills</th>
                        <th className = "col2" scope="col">Course</th>
                        {/* <th scope="col">Description</th> */}
                        {/* <th scope="col">Rating</th> */}
                    </tr>
                </thead>
                <tbody>


                    {table_list.map((item) => {
                        count++;
                        return (
                            <tr key={count}>
                                <th scope="row">{count}</th>
                                <td value={item.name} >
                                {item.name}
                                    </td>
                                <td value={item.cname} >{item.cname}</td>
                                {/* <td><input type="range" className="form-range" min="0" max="5" id="rating"></input></td> */}

                                {/* Rating option                       */}
                                {/* <td>
                                    <select className="form-select" aria-label="Default select example">
  <option selected>Rating</option>
  <option value="1">Basic</option>
  <option value="2">Intermediate</option>
  <option value="3">Advance</option>
  <option value="3">Expert</option>
</select>
                                </td> */}
                            </tr>
                        )
                    })

                    }

                </tbody>
            </table>

            {/* <form action="post">
                	<button type="button" class="btn btn-primary-outline">SEARCH</button>
            </form> */}



        </>

    )
}