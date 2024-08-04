function addUser(){
    let name=document.getElementById('name').value;
    let password=document.getElementById('password').value;
    let email=document.getElementById('email').value;
    var newuser={
        "url":"http://localhost:4000/users",
        "method": "POST",
        //יהיה מסוג json
        "headers":{
            "Content-Type": "application/json"
        },
        //המרה ל json
        "data" :JSON.stringify({
            "name": name,
            "password": password,
            "email": email
        })
    }
    $.ajax(newuser)    //מפעיל אותו
        .done(async function(response){      //אם הצליח
            //response - התגובה שהתקבלה מהשרת
            console.log(response);
            localStorage.setItem("token",response.token);
            localStorage.setItem("user",response.user._id);
            window.location.href ="../html/home.html";
        })
        //פעולה זו תמיד מקבלת את אותו הדבר, משהו קבוע
        // jqXHR מאפשר לגשת לקוד הסטטוס ולמידע נוסף על התגובה.
        // textStatus מספק מחרוזת שמתארת את הסטטוס של הבקשה.
        // errorThrown מכיל מידע נוסף על השגיאה שקרתה, שניתן להדפיס לקונסול לצורך דיבוג.
        .fail(function(jqXHR, textStatus, errorThrown){
            // if(jqXHR.Status>400 && jqXHR.Status<411){
            //     alert("הנתונים שהוכנסו שגויים, נסו שנית");
            // }
            // else{
                console.error("Error:", errorThrown);
            // }
        })
}