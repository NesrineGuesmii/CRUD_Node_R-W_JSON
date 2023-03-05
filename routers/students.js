const express = require('express');
const fs = require('fs');
const router = express.Router();
const {student_schema,student_update_schema} = require('../models/student')

// Route to get all students
router.get('', (req, res) => {
    fs.readFile('students.json', 'utf8', (err, data) => {
      if (err) throw err;
      const students = JSON.parse(data);
      res.json(students);
    });
  });
  
  // Route to get a specific student by name
  router.get('/:name', (req, res) => {
    const name = req.params.nom;
    fs.readFile('students.json', 'utf8', (err, data) => {
      if (err) throw err;
      const students = JSON.parse(data);
      const student = students.find(s => s.nom === name);
      if (!student) {
        res.status(404).json({ message: `Student ${name} not found` });
      } else {
        res.json(student);
      }
    });
  });
  
  // Route to add a new student
  router.post('/', (req, res) => {
    let validation_res = student_schema.validate(req.body);
    if(validation_res.error){        
        return res.status(400).send(validation_res.error.message);
    }
    else
    {  
        const students = JSON.parse(fs.readFileSync('students.json')) 
        const newData =req.body
        let Arraymodule = newData.modules
        Arraymodule.forEach(element => { total+=element.note })
        let average =total/student.modules.length;
 
        const newStudent={
           nom: newData.nom,
           classe: newData.classe,
           modules: newData.modules,
           moyenne : average,
        };

        students.push(newStudent);
        const stringData =JSON.stringify(newStudent);
    
    
        fs.writeFileSync('students.json',stringData)
        res.json(newStudent)
    }
  });
  
  // Route to update an existing student
  router.put('/:name', (req, res) => {

    let validation_res = student_update_schema.validate(req.body)
    if(validation_res.error)
        return res.status(400).send(validation_res.error.message)
    
        const data = JSON.parse( fs.readFileSync('students.json'))
        const nom =req.params.nom
        const newData =req.body

        let Arraymodule = body.modules
        let total=0
        Arraymodule.forEach(element => { total+=element.note }) 
        let average =total/student.modules.length;
    
        const updateData =data.map((item)=>{
            if (item.nom ==nom){
                const newItem ={
                nom:nom,
                classe: newData.classe,
                modules: newData.modules,
                moyenne: average,

                }
                return newItem
            }
        return item
    })

    const stringData =JSON.stringify(updateData)
    fs.writeFileSync('students.json',stringData)
    res.json(updateData)
})
  
  // Route to delete an existing student
  router.delete('/:name', (req, res) => {
    const name = req.params.name;
    fs.readFile('students.json', 'utf8', (err, data) => {
      if (err) throw err;
      const students = JSON.parse(data);
      const index = students.findIndex(s => s.nom === name);
      if (index === -1) {
        res.status(404).json({ message: `Student ${name} not found` });
      } else {
        students.splice(index, 1);
        const newData = JSON.stringify(students);
        fs.writeFile('students.json', newData, (err) => {
          if (err) throw err;
          res.json({ message: `Student ${name} deleted` });
        });
      }
    });
  });


  // Route to get the student with the highest average
router.get('/max', (req, res) => {
    fs.readFile('students.json', 'utf8', (err, data) => {
      if (err) throw err;
      const students = JSON.parse(data);
      if (students.length === 0) {
        res.status(404).json({ message: `No students found` });
      } else {
        let maxMoyenne = students[0].moyenne;
        let maxStudent = students[0];
        for (let i = 1; i < students.length; i++) {
          if (students[i].moyenne > maxMoyenne) {
            maxMoyenne = students[i].moyenne;
            maxStudent = students[i];
          }
        }
        res.json(maxStudent);
      }
    });
  });
  
// Route to get the student with the lowest average
router.get('/min', (req, res) => {
    fs.readFile('students.json', 'utf8', (err, data) => {
      if (err) throw err;
      const students = JSON.parse(data);
      if (students.length === 0) {
        res.status(404).json({ message: `No students found` });
      } else {
        let minMoyenne = students[0].moyenne;
        let minStudent = students[0];
        for (let i = 1; i < students.length; i++) {
          if (students[i].moyenne < minMoyenne) {
            minMoyenne = students[i].moyenne;
            minStudent = students[i];
          }
        }
        res.json(minStudent);
      }
    });
  });

  // Route to get a list of students with their names and averages
router.get('/list', (req, res) => {
    fs.readFile('students.json', 'utf8', (err, data) => {
      if (err) throw err;
      const students = JSON.parse(data);
      if (students.length === 0) {
        res.status(404).json({ message: `No students found` });
      } else {
        const studentList = students.map(student => ({
          nom: student.nom,
          moyenne: student.moyenne
        }));
        res.json(studentList);
      }
    });
  });

  // Route to get each student with their best and worst module
router.get('/modules', (req, res) => {
    fs.readFile('students.json', 'utf8', (err, data) => {
      if (err) throw err;
      const students = JSON.parse(data);
      if (students.length === 0) {
        res.status(404).json({ message: `No students found` });
      } else {
        const studentModules = students.map(student => {
          const modules = student.modules.map(module => module.note);
          const bestModule = Math.max(...modules);
          const worstModule = Math.min(...modules);
          return {
            nom: student.nom,
            best: bestModule,
            worst: worstModule
          };
        });
        res.json(studentModules);
      }
    });
  });
  
  module.exports = router;