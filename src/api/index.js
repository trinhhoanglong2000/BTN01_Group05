import axios from "axios";

const URL = process.env.REACT_APP_API_URL;


// Account API ---------------------------------------------------------------------------------

//Get a account
export const getAccount = async () => {
  let data = null;
  await axios

    .get(`${URL}/Account`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      data = res.data;
    })
    .catch((error) => {
      data = error.response.data;
    });

  return data;
};

// Update account
  export const updateAccount = async (
    firstname,
    lastname,
    password,
    dob,
    studentid
  ) => {
    let message = null;
    const test = await axios
      .post(
        `${URL}/Account/Update`,
        {
          firstname: firstname,
          lastname: lastname,
          password: password,
          dob: dob,
          student_id:studentid,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .catch((error) => {
        message = error.response.data;
      });
    if (message != null) return message;
    return test.data;
  };

//Classes API ----------------------------------------------------------------------------------

//Get All Class
export const getAllClass = async () => {
  let data = null;
  await axios

    .get(`${URL}/classes`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      data = res.data;
    })
    .catch((error) => {
      data = error.response.data;
    });

  return data;
};
// Create a Class 
export const createClass = async (name, Section, Subject, Room) => {
  let message = null;
  const test = await axios
    .post(
      `${URL}/classes/addClass`,
      {
        name: name,
        section: Section,
        subject: Subject,
        room: Room,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((error) => {
      message = error.response.data;
    });
  if (message != null) return message;
  return test.data;
};

// Grade API  -------------------------------------------------------------------------------
export const getGrade = async () => {
  let data = null;
  await axios

    .get(`${URL}/Grade`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      data = res.data;
    })
    .catch((error) => {
      data = error.response.data;
    });

  return data;
};
export const getGradeOfStudentFromClass = async (id) => {
  let data = null;
  await axios

    .get(`${URL}/Grade/GetAllGradeOfStudent/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      data = res.data;
    })
    .catch((error) => {
      data = error.response.data;
    });

  return data;
};
export const getAllGradeFromClass = async (id) => {
  let data = null;
  await axios

    .get(`${URL}/Grade/getAllGradeFromClass/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      data = res.data;
    })
    .catch((error) => {
      data = error.response.data;
    });

  return data;
};
export const UpdateGrades = async (
  ListGrade
) => {

  let message = null;
  const test = await axios
    .post(
      `${URL}/Grade/UpdateGrades`,
      {
        data: ListGrade,
        
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((error) => {
      message = error.response.data;
    });
  if (message != null) return message;
  return test.data;
};

//get HomeWork
export const getHomeWorks= async (id) => {
  let data = null;
  await axios

    .get(`${URL}/HomeWork/GetHomeWorkByClassID?classid=${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      data = res.data;
    })
    .catch((error) => {
      data = error.response.data;
    });

  return data;
};
//create HomeWork
export const createHomeWork = async (data) => {
  let message = null;
  const test = await axios
    .post(
      `${URL}/HomeWork/AddHomeWork`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((error) => {
      message = error.response.data;
    });
  if (message != null) return message;
  return test.data;
};
export const UpdateHomeWork = async (data) => {
  let message = null;
  const test = await axios
    .post(
      `${URL}/HomeWork/UpdateHomeWork`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((error) => {
      message = error.response.data;
    });
  if (message != null) return message;
  return test.data;
};
export const RemoveHomeWork = async (data) => {
  let message = null;
  const test = await axios
    .post(
      `${URL}/HomeWork/RemoveHomeWork`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((error) => {
      message = error.response.data;
    });
  if (message != null) return message;
  return test.data;
};

// Class Account API ---------------------------------------------------------------------
export const getAllAccountFromClass = async (id) => {
  let data = null;
  await axios

    .get(`${URL}/classesaccount/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      data = res.data;
    })
    .catch((error) => {
      data = error.response.data;
    });

  return data;
};
//Check teacher
export const CheckTeacher = async (id) => {
  let data = null;
  await axios

    .get(`${URL}/classesaccount/checkTeacher/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      data = res.data;
    })
    .catch((error) => {
      data = error.response.data;
    });

  return data;
};

// Login API ---------------------------------------------------------------------------
export const Login = async (name, password) => {
  let message = null;
  const test = await axios
    .post(`${URL}/login`, {
      username: name,
      password: password,
    })
    .catch((error) => {
      message = error.response.data;
    });
  if (message != null) return message;
  return test.data;
};
export const Register = async (
  firstname,
  lastname,
  email,
  password,
  phone,

  dob,
  gender
) => {
  let message = null;
  const test = await axios
    .post(`${URL}/register`, {
      firstname: firstname,
      lastname: lastname,
      username: email,
      password: password,
      phone: phone,

      dob: dob,
      gender: gender,
    })
    .catch((error) => {
      message = error.response.data;
    });
  if (message != null) return message;
  return test.data;
};

// Grade Structure API ---------------------------------------------------------------------

export const getGradeStructure = async (id) => {
  let data = null;
 
  await axios
    .get(`${URL}/GradeStructure/GetStructure/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      data = res.data;
     
    })
    .catch((error) => {
      data = error.response.data;
    });

  return data;
};

export const addStructure = async (
  idclass,
  description,
  grade,
) => {
  let message = null;
  const test = await axios
    .post(
      `${URL}/GradeStructure/AddStructure/${idclass}`,
      {
        description: description,
        grade: parseInt(grade)
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((error) => {
      message = error.response.data;
    });
  if (message != null) return message;
  return test.data;
};
export const postListStudent = async (
  listStudentData,
  classId
) => {

  let message = null;
  const test = await axios
    .post(
      `${URL}/classes/addStudentList`,
      {
        listStudentData: listStudentData,
        classId: classId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((error) => {
      message = error.response.data;
    });
  if (message != null) return message;
  return test.data;
};
export const postHomeWordGrade = async (
  homeworkData,
  classId,
  homeworkId
) => {
  let message = null;
  const test = await axios
    .post(
      `${URL}/homeWork/UploadScore`,
      {
        homeworkData: homeworkData,
        classId: classId,
        homeworkId:homeworkId
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((error) => {
      message = error.response.data;
    });
  if (message != null) return message;
  return test.data;
};