// 如需空白範本的簡介，請參閱下列文件: 
// http://go.microsoft.com/fwlink/?LinkID=397704
// 若要對 cordova-simulate 中頁面載入上或 Android 裝置/模擬器上的程式碼偵錯: 啟動應用程式、設定中斷點、
// 然後在 JavaScript 主控台中執行 "window.location.reload()"。
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);


    function onDeviceReady() {
        var db = window.openDatabase("Database", "1.0",
            "Cordova", 2 * 1024 * 1024);
        $(document).ready(function () {
            $.getJSON('data.json',function (data) {
              JSONGET(data);
            });
        });
        db.transaction(createDB, errorDB);
        db.transaction(createPlanDB, errorDB);
        db.transaction(createEatDB, errorDB);
       
        $("#planStart").click(function () {
            hide();
            $("#sports-button span").text("請選擇");
            $("#sports").empty();
            var str = "<option" + " value=" + "'請選擇'" + ">" + "請選擇" + "</option>";
            $("#sports").append(str);
            str = " <option" + " value=" + "'無氧'" + ">" + "無氧" + "</option>";
            $("#sports").append(str);
            str = " <option" + " value=" + "'有氧'" + ">" + "有氧" + "</option>";
            $("#sports").append(str);
        });
       
        $("#save").click(function () {
            db.transaction(insertDB, errorDB);
            db.transaction(queryInDB, errorDB);
            db.transaction(queryTdeeDB, errorDB);
            db.transaction(queryInEatDB, errorDB);
        });
        $("#savePlan").click(function () {
            $("#sports-button span").text("請選擇");
            db.transaction(insertPlanDB, errorDB);
        });
        $("#openPage1").ready(function () {
            setTimeout(function () {
                db.transaction(queryDB, errorDB);
                db.transaction(queryTdeeDB, errorDB);
                db.transaction(queryEatDB, errorDB);
            }, 3500);
        });
       
        $("#SearchStart").click(function () {
            $("#sports1-button span").text("請選擇");
            $("#S2").css("display", "none");
            $("#resultDiv").css("display", "none");
            $("#sports1").empty();
            var str = "<option" + " value=" + "'請選擇'" + ">" + "請選擇" + "</option>";
            $("#sports1").append(str);
            str = " <option" + " value=" + "'無氧'" + ">" + "無氧" + "</option>";
            $("#sports1").append(str);
            str = " <option" + " value=" + "'有氧'" + ">" + "有氧" + "</option>";
            $("#sports1").append(str);
        });
        $("#Pback").click(function(){
            $("#sports-button span").text("請選擇");
        });
        $("#height").change(total);
        $("#weight").change(total);
        $("#sex").change(total);
        $("#age").change(total); 
        $("#aex").change(total);
        $("#sports").change(function () {
            var queID = $("#sports");
            if (queID.val() != "請選擇") {
                Show();
                db.transaction(querySDB, errorDB);
                db.transaction(queryLTDB, errorDB);
            }
            else {
                alert("請選擇項目");
                window.location.href = 'index.html#plan';
            }
          
        }); 
        $("#sports1").change(function () {
            var queID = $("#sports1");
            if (queID.val() != "請選擇") {
                $("#S2").css("display", "");
                db.transaction(querySADB, errorDB);
            }
            else {
                alert("請選擇項目");
                window.location.href = 'index.html#plan';
            }
         
        }); 
        $("#sports2").change(function () {
            var queID = $("#sports1");
            if (queID.val() != "請選擇") {
                db.transaction(querySAADD, errorDB);
                $("#resultDiv").css("display", "");
            }
            else {
                alert("請選擇項目");
                window.location.href = 'index.html#plan';
            }
         
          
        }); 
        $("#SChange").click(ChangeSname);
        $('#foodList').click(function (e) {
            var elements = e.target;
            FoodData(elements);
        });
        $("#g").change(total2);
        $("#savefood").click(function () {
            FoodList();
            db.transaction(updateUSEREatDB, errorDB);
            db.transaction(insertEatDB, errorDB);
        });
        $("#resultT").click(function (e) {
            var elements = e.target;
            SresultData(elements);

        });
        $("#bf").click(function () { $("#fd").text("早餐"); });
        $("#lh").click(function () { $("#fd").text("午餐"); });
        $("#dr").click(function () { $("#fd").text("晚餐"); });
        $("#editData").click(function () {
            $("#save").css("display", "none");
            $("#save1").css("display", "");
            $("#back").css("display", "");
            $("#id").attr("readonly", "readonly");
            $("#id").val($("#dataID").text());
            $("#height").val($("#dataHeight").text());
            $("#weight").val($("#dataWeight").text());
            $("#age").val($("#dataAge").text());
            $("#sex").val($("#dataSex").text());
            $("#aex").val($("#dataAex").text());
            $("#BMR").text($("#dataBMR").text());
            $("#TDEE").text($("#dataTDEE").text());
        });
        $("#save1").click(function () {
            $("#id").removeAttr("readonly");
            db.transaction(updateUSERdata, errorDB);
            db.transaction(queryInDB, errorDB);
            db.transaction(queryTdeeDB, errorDB);
            db.transaction(queryInEatDB, errorDB);
        });

        $("#editS").click(function () {
            $("#sports1-button span").text("請選擇");
            $("#editS").css("display", "none");
            $("#esdelete").css("display", "");
            $("#editSSave").css("display", "");
            var Sp1 = $("#sports1").val();
            switch (Sp1) {
                case "無氧":
                    $("#Sname").removeAttr("readonly");
                    $("#Sfrequency").removeAttr("readonly");
                    $("#Sgroups").removeAttr("readonly");
                    $("#SSweight").removeAttr("readonly");
                    $("#Sdate").removeAttr("readonly");
                    break;
                case "有氧":
                    $("#SAname").removeAttr("readonly");
                    $("#SAtime").removeAttr("readonly");
                    $("#SAdate").removeAttr("readonly");
                    break;
            }

        });
        $("#editSSave").click(function () {
            $("#sports1-button span").text("請選擇");
            $("#editS").css("display", "");
            $("#esdelete").css("display", "none");
            $("#editSSave").css("display", "none");
            var Sp1 = $("#sports1").val();
            switch (Sp1) {
                case "無氧":
                    $("#Sname").attr("readonly", "readonly");
                    $("#Sfrequency").attr("readonly", "readonly");
                    $("#Sgroups").attr("readonly", "readonly");
                    $("#SSweight").attr("readonly", "readonly");
                    $("#Sdate").attr("readonly", "readonly");
                    break;
                case "有氧":
                    $("#SPKind").attr("readonly", "readonly");
                    $("#SAname").attr("readonly", "readonly");
                    $("#SAtime").attr("readonly", "readonly");
                    $("#SAdate").attr("readonly", "readonly");
                    break;
            }
            db.transaction(updateSportData, errorDB);
        });
        $("#esdelete").click(function () {
            $("#sports1-button span").text("請選擇");
            $("#editS").css("display", "");
            $("#esdelete").css("display", "none");
            $("#editSSave").css("display", "none");
            $("#form03").css("display", "none");
            $("#form04").css("display", "none");
            var Sp1 = $("#sports1").val();
            switch (Sp1) {
                case "無氧":
                    $("#Sname").attr("readonly", "readonly");
                    $("#Sfrequency").attr("readonly", "readonly");
                    $("#Sgroups").attr("readonly", "readonly");
                    $("#SSweight").attr("readonly", "readonly");
                    $("#Sdate").attr("readonly", "readonly");
                    break;
                case "有氧":
                    $("#SPKind").attr("readonly", "readonly");
                    $("#SAname").attr("readonly", "readonly");
                    $("#SAtime").attr("readonly", "readonly");
                    $("#Sstrength").attr("disabled", "disabled");
                    $("#SAdate").attr("readonly", "readonly");
                    break;
            }
            db.transaction(DeleteSportData, errorDB);
        });
        $("#esback").click(function () {

            $("#editS").css("display", "");
            $("#esdelete").css("display", "none");
            $("#editSSave").css("display", "none");
            $("#form03").css("display", "none");
            $("#form04").css("display", "none");
            var Sp1 = $("#sports1").val();
            switch (Sp1) {
                case "無氧":
                    $("#Sname").attr("readonly", "readonly");
                    $("#Sfrequency").attr("readonly", "readonly");
                    $("#Sgroups").attr("readonly", "readonly");
                    $("#SSweight").attr("readonly", "readonly");
                    $("#Sdate").attr("readonly", "readonly");
                    break;
                case "有氧":
                    $("#SPKind").attr("readonly", "readonly");
                    $("#SAname").attr("readonly", "readonly");
                    $("#SAtime").attr("readonly", "readonly");
                    $("#Sstrength").attr("readonly", "readonly");
                    $("#SAdate").attr("readonly", "readonly");
                    break;
            }
        });
        $('#bfD').click(function (e) {
            var elements = e.target;
            var Id = '#bfD';
            FoodEditData(elements,Id);
        });
        $('#lhD').click(function (e) {
            var elements = e.target;
            var Id = '#lhD';
            FoodEditData(elements, Id);
        });
        $('#drD').click(function (e) {
            var elements = e.target;
            var Id = '#drD';
            FoodEditData(elements, Id);
        });
        $("#dfood").click(function () {
            var meal = $('#mealD').val();
            console.log(meal);
            $(meal).empty();
            db.transaction(DeleteEatFood, errorDB);
            db.transaction(DeleteUSEREatDB, errorDB); 
            db.transaction(queryEatDB, errorDB);
         
        });
    }

   

    function DeleteUSEREatDB(tx) {
        var Kc = $("#kcal3-2").text();
        var KcT = $("#FOOD_TDEE").text();
        var TDEE = KcT.split("/");
        var Kc2 = Kc.split(" ");
        var total1 = parseInt(TDEE[0]) - parseInt(Kc2[0]);
        var Fkc = total1 + "/" + TDEE[1];
        $("#FOOD_TDEE").text(Fkc);
        var id = $("#dataID").text();
        var Today = new Date();
        var setDate = Today.getFullYear() + "-" + (Today.getMonth() + 1) + "-" + Today.getDate();
        var str = 'UPDATE USER SET eat = ?,date = ? WHERE id = ? ';
        tx.executeSql(str, [total1, setDate, id]);
    }
    function DeleteEatFood(tx) {
        var id = $("#dataID").text();
        var setName = $("#foodName3");
        var setKcal = $("#kcal3-2");
        var Today = new Date();
        var setDate = Today.getFullYear() + "-" + (Today.getMonth() + 1) + "-" + Today.getDate();
        var str = 'DELETE FROM EAT WHERE id =? AND name=? AND kcal=? AND date=?';
        tx.executeSql(str, [id, setName.text(), setKcal.text(), setDate]);
     
    }
    function DeleteSportData(tx) {
        var sports = $('#sports1').val();
        var id = $("#dataID").text();
        switch (sports) {
            case "無氧":
                var setName = $("#Sname");
                var setFrequency = $("#Sfrequency");
                var setGroups = $("#Sgroups");
                var setWeight = $("#SSweight");
                var setDate = $("#Sdate");
                var str = 'DELETE FROM ANAEROBIC WHERE id =? AND name=? AND frequency=? AND groups=? AND weight=? AND date=?';
                tx.executeSql(str, [id, setName.val(), setFrequency.val(), setGroups.val(), setWeight.val(), setDate.val()]);
                break;
            case "有氧":
               setName = $("#SAname");
                var setTime = $("#SAtime");
                var setStrength = $("#Sstrength");
                setDate = $("#SAdate");
                str = 'DELETE FROM AEROBIC WHERE id =? AND name=? AND time=? AND strength=? AND date=?'
                tx.executeSql(str, [id, setName.val(), setTime, setStrength, setWeight.val(), setDate.val()]);
                break;
        }
    }
    function updateSportData(tx) {
        var sports = $('#sports1').val();
        var id = $("#dataID").text();
        var sp = $("#oldData").text().split(",");
        console.log(sp);
        switch (sports) {
            case "無氧":
                var setName = $("#Sname");
                var setFrequency = $("#Sfrequency");
                var setGroups = $("#Sgroups");
                var setWeight = $("#SSweight");
                var setDate = $("#Sdate");
                var str = 'UPDATE  ANAEROBIC SET name=?, frequency=?, groups=?, weight=?, date=? WHERE id =? AND name=? AND frequency=? AND groups=? AND weight=? AND date=? ';
                tx.executeSql(str, [setName.val(), setFrequency.val(), setGroups.val(), setWeight.val(), setDate.val(), id, sp[0], sp[4], sp[6], sp[8],sp[2]]);
                break;
            case "有氧":
                setName = $("#SAname");
                var setTime = $("#SAtime");
                var setStrength = $("#Sstrength");
                setDate = $("#SAdate");
                str = 'UPDATE  AEROBIC SET name=?, time=?,strength=?,date=? WHERE id =? AND name=? AND time=? AND strength=? AND date=?';
                tx.executeSql(str, [setName.val(), setTime, setStrength, setWeight.val(), setDate.val(), id, sp[0], sp[4], sp[6], sp[2]]);
                break;
        }
      
    }
    function updateUSERdata(tx) {
        var setId = $("#id");
        var setHeight = $("#height");
        var setWeight = $("#weight");
        var setAge = $("#age");
        var setSex = $("#sex");
        var setAex = $("#aex");
        var setBMR = $("#BMR");
        var setTDEE = $("#TDEE");
        var str = 'UPDATE USER SET height = ?,weight = ?,age = ?,sex = ?,aex = ?,bmr = ?,tdee = ? WHERE id =?';
        tx.executeSql(str, [setHeight.val(), setWeight.val(), setAge.val(), setSex.val(), setAex.val(), setBMR.text(), setTDEE.text(), setId.val()]);
    }
    function updateUSEREatDB(tx) {
        var id = $("#dataID").text();
        var total = $("#FOOD_TDEE").text();
        var total1 = total.split("/");
        var Today = new Date();
        var setDate = Today.getFullYear() + "-" + (Today.getMonth() + 1) + "-" + Today.getDate();
        var str = 'UPDATE USER SET eat = ?,date = ? WHERE id = ? ';
        tx.executeSql(str, [total1[0],setDate,id]);
    }
    function FoodList() {
        var fn = $("#foodName").text();
        var Kc = $("#kcal2").text();
        var comefrom = $("#fd").text();
        var KcT = $("#FOOD_TDEE").text();
        var TDEE = KcT.split("/");
        var Kc2 = Kc.split(" ");
        var total1 = parseInt(Kc2[0]) + parseInt(TDEE[0]);
        var Fkc = total1 + "/" + TDEE[1];
        $("#FOOD_TDEE").text(Fkc);
        var str = "<li" + ">";
        str += "<a" + " href='#food3' " + " id='" + Kc + "'>";
        str += fn + " " + Kc ;
        str += "</a>";
        str += "</li>";
        var ID;
        switch (comefrom) {
            case "早餐":
                $("#bfD").append(str);
                $("#bfD").listview().listview("refresh");
                break;
            case "午餐":
                $("#lhD").append(str);
                $("#lhD").listview().listview("refresh");
                break;
            case "晚餐":
                $("#drD").append(str);
                $("#drD").listview().listview("refresh");
                break;
        }
       
    }
    function FoodEditData(food,meal) {
        // console.log(food.text);
        $('#mealD').val(meal);
        $('#g-3').val("");
        var fdN = food.text.split(" ");
        $("#foodName3").text(fdN[0]);
        var fd = food.id.split(" ");
        var KC = fd[0] + " kcal";
        $('#kcal3-2').text(KC);
    }
    function FoodData(food) {
        // console.log(food.text);
        $('#g').val("");
        $('#kcal2').text(" ");
        $("#foodName").text(food.text);
        var fd = food.id.split(".");
        var KC =fd[0] + " kcal";
        $("#kcal").text(KC);
    }
    function SresultData(Sports) {
        var Sp1 = $("#sports1").val();
        var sp = Sports.text.split(" ");
        var id = Sports.id;
        var old = id + "," + sp ;
        $("#oldData").text(old);
        //"readonly",""
        console.log(Sports);
        console.log(sp);
        switch (Sp1) {
            case "無氧":
                $("#form03").css("display", "");
                $("#Sname").val(id);
                $("#Sfrequency").val(sp[3]);
                $("#Sgroups").val(sp[5]);
                $("#SSweight").val(sp[7]);
                $("#Sdate").val(sp[1]);
                break;
            case "有氧":
                $("#form04").css("display", "");
                $("#SAname").val(id);
                $("#SAtime").val(sp[2]);
                $("#Sstrength").val(sp[4]);
                $("#SAdate").val(sp[6]);
                break;
        }
    }
    function JSONGET(mvArr) {
        for (var i = 0; i < mvArr.length; i++) {
            var name = mvArr[i][3]["樣品名稱"];
            var name2 = mvArr[i][9]["分析項"];
            var name3 = mvArr[i][11]["每100克含量"];
            if (name2 == "熱量") {
                var str = "<li" + " id=" + name+ ">";
                str += "<a href='#food2'" + " id=" + name3  + ">" + name + "</a>";
                str += "</li>";
                $("#foodList").append(str);
            }
            
        }
    
    }
    function Show() {
        var sports = $('#sports').val();
       
        switch (sports) {
            case "無氧":
                $("#form01").css("display", "");
                $("#form02").css("display", "none");
                $("#savePlan").css("display", "");
                $("#Pback").css("display", "");
                $("#LT").css("display", "");
                break;
            case "有氧":
                $("#form01").css("display", "none");
                $("#form02").css("display", "");
                $("#savePlan").css("display", "");
                $("#Pback").css("display", "");
                $("#LT").css("display", "");
                break;
        }

    }
    function hide() {

                $("#form01").css("display","none");
                $("#form02").css("display", "none");
                $("#savePlan").css("display", "none");
                $("#Pback").css("display", "none");
                $("#LT").css("display", "none");

              

    }
    function ChangeSname() {
        $("#W2").css("display", "");
        $("#W1").css("display", "none");
        $("#Badd").css("display", "none");
        console.log("--C--");
    }
    function total2() {
        var g = $('#g').val();
        var kcal = parseInt($('#kcal').text());
        var kcalT = 0;
        kcalT = (kcal / 100) * g;
        var reT = kcalT.toFixed(0) + " kcal";
        $("#kcal2").text(reT);
    }
    function total() {

        var sex = $('#sex').val();
        var CM = $('#height').val();
        var KG = $('#weight').val();
        var age = $('#age').val();
        var aex = $('#aex').val();
        var BMR = 0;
        var TDEE = 0;
        switch (sex) {
            case "男性":
                BMR = (10 * KG) + (6.25 * CM) - (5 * age) + 5;
                break;
            case "女性":
                BMR = (10 * KG) + (6.25 * CM) - (5 * age) -161;
                break;
        }
        $("#BMR").text(BMR.toFixed(1));
        switch (aex) {
            case "沒在運動":
                TDEE = BMR * 1.2 ;
                break;
            case "一周1~3天(輕度)":
                TDEE = BMR * 1.375;
                break;
            case "一周3~5天(中度)":
                TDEE = BMR * 1.55;
                break;
            case "一周5~7天(高度)":
                TDEE = BMR * 1.725;
                break;
            case "都在運動(超高度)":
                TDEE = BMR * 1.9;
                break;
        }
        $("#TDEE").text(TDEE.toFixed(1));

    }
    function createDB(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS USER (id unique, height, weight, age, sex ,aex, bmr, tdee, date, eat)');
    }
    function createPlanDB(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS AEROBIC (id, name, time, strength, date)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS ANAEROBIC (id, name, frequency, groups , weight, date)');
    }
    function createEatDB(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS EAT (id, name , kcal ,date ,meal)');
    }
    // 插入記錄
    function insertDB(tx) {
        var setID = $("#id");
        var setHeight = $("#height");
        var setWeight = $("#weight");
        var setAge = $("#age");
        var setSex = $("#sex");
        var setAex = $("#aex");
        var setBMR = $("#BMR");
        var setTDEE = $("#TDEE");
        var Today = new Date();
        var setDate = Today.getFullYear() + "-" + (Today.getMonth() + 1) + "-" + Today.getDate();
        var str = "INSERT INTO USER (id , height, weight, age, sex ,aex, bmr, tdee, date, eat) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        tx.executeSql(str, [setID.val(), setHeight.val(), setWeight.val(), setAge.val(), setSex.val(), setAex.val(), setBMR.text(), setTDEE.text(), setDate,"0"]);
    }
    function insertPlanDB(tx) {
        var sports = $('#sports').val();
        var id = $("#dataID").text();
        switch (sports) {
            case "無氧":
                var setFrequency = $("#frequency");
                var setGroups = $("#groups");
                var setWeight = $("#Sweight");
                var setDate = $("#Wdate");
                var str = "INSERT INTO ANAEROBIC (id, name, frequency, groups , weight, date) VALUES (?, ?, ?, ?, ?, ?)";
                var setName = $("#Wname2");
                if (setName.val() == "") {
                    setName = $("#Wname");
                    if (setName.val() != "請選擇") {
                        tx.executeSql(str, [id, setName.val(), setFrequency.val(), setGroups.val(), setWeight.val(), setDate.val()]);
                    }
                    else {
                        alert("請選擇項目");
                        window.location.href = 'index.html#plan';
                    }
                }
                else {
                    tx.executeSql(str, [id, setName.val(), setFrequency.val(), setGroups.val(), setWeight.val(), setDate.val()]);
                }
                break;
            case "有氧":
                var setTime = $("#Atime");
                var setStrength = $("#strength");
                console.log(setStrength.val());
                setDate = $("#Adate");
                str = "INSERT INTO AEROBIC (id, name, time, strength, date) VALUES (?, ?, ?, ?, ?)";
                setName = $("#Aname2");
                if (setName.val() == "") {
                    setName = $("#Aname");
                    if (setName.val() != "請選擇") {
                        if (setStrength.val() != "" && setStrength.val() != "請選擇"){
                            tx.executeSql(str, [id, setName.val(), setTime.val(), setStrength.val(), setDate.val()]);
                        }
                        else {
                            alert("請選擇強度");
                            window.location.href = 'index.html#plan';
                        }
                    }
                    else {
                        alert("請選擇項目");
                        window.location.href = 'index.html#plan';
                    }
                }
                else {
                    tx.executeSql(str, [id, setName.val(), setTime.val(), setStrength.val(), setDate.val()]);
                }
                break;
        }
        $("#frequency").val("");
        $("#groups").val("");
        $("#Sweight").val("");
        $("#Wdate").val("");
        $("#Aname2").val("");
        $("#Atime").val("");
        $("#strength").val("");
        $("#Adate").val("");
        for (var i = 1; i < $("#Wname").length; i++){
            console.log($("#Wname").length);
            $("#Wname").empty(i);
            }
        for (var i = 1; i < $("#Aname").length; i++) {
            console.log($("#Aname").length);
            $("#Aname").empty(i);
        }
        $("#Wname2").val("");
    }
    function insertEatDB(tx) {
        var id = $("#dataID").text();
        var Today = new Date();
        var setDate = Today.getFullYear() + "-" + (Today.getMonth() + 1) + "-" + Today.getDate();
        var setName = $("#foodName");
        var setKcal = $("#kcal2");
        var comefrom = $("#fd");
        var str = "INSERT INTO EAT (id, name, kcal, date, meal) VALUES (?, ?, ?, ?, ?)";
        tx.executeSql(str, [id, setName.text(), setKcal.text(), setDate, comefrom.text()]);
    }
    function queryInEatDB(tx) {
        var id = $("#id").text();
        var Today = new Date();
        var setDate = Today.getFullYear() + "-" + (Today.getMonth() + 1) + "-" + Today.getDate();
        
        var str = 'SELECT * FROM EAT WHERE id = ? AND date = ?';
        tx.executeSql(str, [id, setDate], queryEatSuccess, errorDB);
    }
    function queryEatDB(tx) {
        var id = $("#dataID").text();
        var Today = new Date();
        var setDate = Today.getFullYear() + "-" + (Today.getMonth() + 1) + "-" + Today.getDate();
        var str = 'SELECT * FROM EAT WHERE id = ? AND date = ?';
        tx.executeSql(str, [id,setDate], queryEatSuccess, errorDB);
    }
    function queryEatSuccess(tx, results) {
        var len = results.rows.length;
        for (var i = 0; i < len; i++) {
            var str = "<li" + ">";
            str += "<a" + " href='#food3' " + " id='" + results.rows.item(i).kcal + "'>";
            str += results.rows.item(i).name + " " + results.rows.item(i).kcal;
            str += "</a>";
            str += "</li>";
            switch (results.rows.item(i).meal) {
                case "早餐":
                    $("#bfD").append(str);
                    $("#bfD").listview().listview("refresh");
                    break;
                case "午餐":
                    $("#lhD").append(str);
                    $("#drD").listview().listview("refresh");
                    break;
                case "晚餐":
                    $("#drD").append(str);
                    $("#lhD").listview().listview("refresh");
                    break;
            }
            
        }
      
       
        
       
    }

    // 查詢資料庫
    function queryTdeeDB(tx) {
        var queID = $("#dataID");       
        var str = 'SELECT * FROM USER WHERE id = ?';
        tx.executeSql(str, [queID.text()], queryTdeeSuccess, errorDB);
    }
    function queryLTDB(tx) {
        var sports = $('#sports').val();
        var queID = $("#dataID");
        var str;
        switch (sports) {
            case "無氧":
                str = 'SELECT * FROM ANAEROBIC WHERE id = ?';
                break;
            case "有氧":
                str = 'SELECT * FROM AEROBIC WHERE id = ?';
                break;
        }
        tx.executeSql(str, [queID.text()], queryLTSuccess, errorDB);
      
    }
    function querySADB(tx) {
        var sports = $('#sports1').val();
        var queID = $("#dataID");
        var str;
        switch (sports) {
            case "無氧":
                str = 'SELECT DISTINCT name FROM ANAEROBIC WHERE id = ?';
                break;
            case "有氧":
                str = 'SELECT DISTINCT name FROM AEROBIC WHERE id = ?';
                break;
        }
        tx.executeSql(str, [queID.text()], querySASuccess, errorDB);

    }
    function querySAADD(tx) {
        var sports1 = $('#sports1').val();
        var sports2 = $('#sports2').val();
        var str;
        switch (sports1) {
            case "無氧":
                str = 'SELECT * FROM ANAEROBIC WHERE name = ?';
                break;
            case "有氧":
                str = 'SELECT * FROM AEROBIC WHERE name = ?';
                break;
        }
        tx.executeSql(str, [sports2], querySAADDSuccess, errorDB);
    }
    function querySAADDSuccess(tx, results) {
        var len = results.rows.length;
        $("#resultT").empty();
       
        var sports1 = $('#sports1').val();
        switch (sports1) {
            case "有氧":
                for (var i = 0; i < len; i++) {
                    var str = "<li"  + ">";
                    str += "<a href='#plan3'"+ " id= " + results.rows.item(i).name +" > " ;
                    str += "持續時間: " + results.rows.item(i).time;
                    str += " 強度: " + results.rows.item(i).strength;
                    str += " 日期: " + results.rows.item(i).date;
                    str += "</a>" + "</li>";
                    $("#resultT").append(str);
                    $("#resultT").listview("refresh");
                }
                break;
            case "無氧":
                for (var i = 0; i < len; i++) {
                    str = "<li"  + ">";
                    str += "<a href='#plan3'" + " id=" + results.rows.item(i).name + ">";
                    str += "日期: " + results.rows.item(i).date;
                    str += " 次數: " +results.rows.item(i).frequency;
                    str += " 組數: " + results.rows.item(i).groups;
                    str += " 重量: " + results.rows.item(i).weight;
                    str += "</a>"+"</li>";
                    $("#resultT").append(str);
                    $("#resultT").listview("refresh");
                }
                break;
        }
    }

    function querySASuccess(tx, results) {
        var len = results.rows.length;
        console.log(results);
        $("#sports2").empty();
        $("#sports2-button span").text("請選擇");
        var str = "<option" + " value=" + "請選擇"+ ">" + "請選擇";
        str += "</option>";
        $(sports2).append(str);
        if (len != 0) {
            for (var i = 0; i < len; i++) {
               
                       str = "<option" + " value=" + results.rows.item(i).name + ">" + results.rows.item(i).name;
                       str += "</option>";
                       $("#sports2").append(str);

                       console.log('---OK---');

            }
        }
            
    }
  
    function queryInTdeeDB(tx) {
        var queID = $("#id");
        var str = 'SELECT * FROM USER WHERE id = ?';
        tx.executeSql(str, [queID.text()], queryTdeeSuccess, errorDB);
    }
    function queryDB(tx) {
            var str = 'SELECT * FROM USER';
            tx.executeSql(str, [], querySuccess, errorDB);
       
    }
    function queryInDB(tx) {
        var queID = $("#id");
        var str = 'SELECT * FROM USER WHERE id = ?';
        tx.executeSql(str, [queID.val()], querySuccess, errorDB);
    }
    function querySDB(tx) {
        var sports = $('#sports').val();
        var queID = $("#dataID");
        var str;
        switch (sports) {
            case "無氧":
                str = 'SELECT DISTINCT name FROM ANAEROBIC WHERE id = ?';
                break;
            case "有氧":
                str = 'SELECT DISTINCT name FROM AEROBIC WHERE id = ?';
                break;
        }
        tx.executeSql(str, [queID.text()], querySSuccess, errorDB);
    }
    function queryIdDB(tx) {
        var str = 'SELECT id FROM USER';
        tx.executeSql(str, [], queryIdSuccess, errorDB);
    }
    function editDB(tx) {
        var setName = $("#name");
        var setID = $("#ID");
        var setAge = $("#age");
        var str = 'UPDATE USER SET id = ? ,name = ? , age = ?';
        tx.executeSql(str, [setID.val(), setName.val(), setAge.val()], queryTdeeSuccess, errorDB);
    }
    // 查詢TDEE成功的回撥函數
    function queryTdeeSuccess(tx, results) {
        var len = results.rows.length;
        if (len != 0){
            var Today = new Date();
            var today = Today.getFullYear() + "-" + (Today.getMonth() + 1) + "-" + Today.getDate();
            if (results.rows.item(0).date == today) {
                var str = results.rows.item(0).eat + "/" + results.rows.item(0).tdee + " Kcal";
            }
            else {
                str = "0" + "/" + results.rows.item(0).tdee + " Kcal";
            }
            $("#FOOD_TDEE").text(str);
        }
       
        else {
            console.log("first");
        }
       
     
    }
    // 查詢ID成功的回撥函數
    function queryIdSuccess(tx, results) {
        var len = results.rows.length;
        for (var i = 0; i < len; i++) {
            var str = "<option" + " value=" + results.rows.item(i).id + ">" + results.rows.item(i).id;
            str += "</option>";
            $("#qID").append(str);
        }
        
       
    }
    function querySSuccess(tx, results) {
        var len = results.rows.length;
        var sports = $('#sports').val();
        var N1, N2, B, N3;
     

        switch (sports) {
            case "無氧":
                N2 = $("#W2");
                N1 = $("#W1");
                B = $("#Badd");
                N3 = "#Wname";
                break;
            case "有氧":
                N2 = $("#A2");
                N1 = $("#A1");
                B = $("#Badd2");
                N3 = "#Aname";
                break;
        }
        $("#frequency").val("");
        $("#groups").val("");
        $("#Sweight").val("");
        $("#Wdate").val("");
        $("#Aname").val("");
        $("#Atime").val("");
        $("#strength").val("");
        $("#Adate").val("");
        $("#Wname2").val("");
        $(N3).empty();
        var str = "<option" + " value=" + "請選擇"+">" + "請選擇";
        str += "</option>";
        $(N3).append(str);
        var N3ButtonSpan = N3 + "-button span";
        $(N3ButtonSpan).text("請選擇");
        console.log(len);
        if (len == 0) {
            N2.css("display", "");
            N1.css("display", "none");
        }
        else {
            N2.css("display", "none");
            N1.css("display", "");
            B.css("display", "");
            for (var i = 0; i < len; i++) {

                    str = "<option" + " value=" + results.rows.item(i).name + ">" + results.rows.item(i).name;
                    str += "</option>";
                    $(N3).append(str);
                    console.log('---OK---');
                
               
            }

        }
    }
    function querySuccess(tx, results) {
            var len = results.rows.length;
            if (len != 0) {

                $("#dataID").text(results.rows.item(0).id);
                $("#dataAge").text(results.rows.item(0).age);
                $("#dataHeight").text(results.rows.item(0).height);
                $("#dataWeight").text(results.rows.item(0).weight);
                $("#dataSex").text(results.rows.item(0).sex);
                $("#dataAex").text(results.rows.item(0).aex);
                $("#dataBMR").text(results.rows.item(0).bmr);
                $("#dataTDEE").text(results.rows.item(0).tdee);
                window.location.href = "index.html#first";
            }
            else {
                window.location.href = "index.html#openPage";
            }

           
    }
    function queryLTSuccess(tx, results) {
        var len = results.rows.length;
       
        $("#recordList").empty();
        var sports = $('#sports').val();
        if (len != 0) {
            switch (sports) {
                case "有氧":
                    var str = "<li" + " id=" + results.rows.item(len - 1).name + ">" + results.rows.item(len - 1).name + "<BR>";
                    str += " 持續時間:"+ results.rows.item(len - 1).time  ;
                    str += " 強度:" + results.rows.item(len - 1).strength;
                    str += " 日期:" + results.rows.item(len - 1).date;
                    str += "</li>";
                    $("#recordList").append(str);
                    break;
                case "無氧":
                    var str = "<li" + " id=" + results.rows.item(len - 1).name + ">" + results.rows.item(len - 1).name + "<BR>";
                    str += results.rows.item(len - 1).frequency + "下 " ;
                    str += results.rows.item(len - 1).groups + "組 " ;
                    str += " 重量:" + results.rows.item(len - 1).weight;
                    str += " 日期:" + results.rows.item(len - 1).date;
                    str += "</li>";
                    $("#recordList").append(str);
                    break;
            }
            $("#recordList").listview("refresh");
        }
    }
    // 查詢錯誤的回撥函數
    function errorDB(err) {
        alert("錯誤!執行SQL錯誤: " + err.code);
    }

} )();