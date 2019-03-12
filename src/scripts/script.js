window.addEventListener('DOMContentLoaded', () =>{

    const loadContent = async (url, callback) =>{
        await fetch(url)  //Promise
            .then(response => response.json())
            .then(json => createNewElement(json.patients));
    
        callback();
    }

    function createNewElement(arr){
        const patientsWrapper = document.querySelector('.table_item');
        let i = 1;
        arr.forEach(function(item){
            let patientTable = document.createElement('tr');
            patientTable.classList.add('table_patient');
            patientTable.innerHTML = `
                <th class="number">${i}</th>
                <th class="surname">${item.surname}</th>
                <th class="name">${item.name}</th>
                <th class="birthDate">${item.birthDate}</th>
                <th class="gender">${item.gender}</th>
                <th class="numberIB">${item.numberIB}</th>
                <th class="anestDate">${item.anestDate}</th>
                <th class="anestTimeMin">${item.anestTimeMin}</th>
                <th class="anestType">${item.anestType}</th>
            `;
            patientsWrapper.appendChild(patientTable);
            i+=1;
        });
    }
    
    loadContent('scripts/db.json', () =>{

        const buttonComplete = document.querySelector('.button_complete')
        function complete(){
            fs.readFile('scripts/db.json', 'utf8', function readFileCallback(err, data){
                if (err){
                    console.log(err);
                } else {
                obj = JSON.parse(data); //now it an object
                var arr = {
                    surname: document.querySelector('.input_surname').value,
                    name: document.querySelector('.input_name').value,
                    birthDate: document.querySelector('.input_birthDate').value,
                    gender: document.querySelector('.input_gender').value,
                    numberIB: document.querySelector('.input_numberIB').value, 
                    anestDate: document.querySelector('.input_anestDate').value, 
                    anestTimeMin: document.querySelector('.input_anestTimeMin').value, 
                    anestType: document.querySelector('.input_anestType').value}; 
                $.ajax({
                    url:'scripts/data.php',
                    type: 'POST',
                    data: {myJson: JSON.stringify(arr), fileName: 'scripts/db.json.json'}
                });
                
            }});
            
        }
        buttonComplete.addEventListener('click', complete);
    });
});