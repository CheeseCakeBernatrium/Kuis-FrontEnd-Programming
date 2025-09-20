const signUpForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const h2Home = document.getElementById('h2UserName');
const logButton = document.getElementById('btnLog');

/* Sign Up */
if (signUpForm) {
    signUpForm.addEventListener("submit", function(e){
        e.preventDefault();

        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
        const fullName = document.getElementById('signupFullName').value;
        const phoneNumber = document.getElementById('signupPhoneNumber').value;

        //validasi ukuran password
        if(password.length < 8){
            alert("Kata sandi minimal 8 karakter!");
            return;
        }
        //mencocoki password
        if(password !== confirmPassword){
            alert("Kata sandi tidak cocok!");
            return;
        }
        //validasi nama
        const nameRegex = /^[A-Za-z\s]+$/;
        const phoneRegex = /^08\d{8,14}$/;
        if (!nameRegex.test(fullName)) {
            alert("Nama panjang hanya mengandung karakter dan spasi!");
            return;
        }
        if (fullName.length < 3 || fullName.length > 32) {
            alert("Nama panjang harus di antara 3 dan 32 karakter!");
            return;
        }
        //validasi nomor tlp
        if (!phoneRegex.test(phoneNumber)) {
            alert("Nomor telepon harus berawal '08-' dan memiliki 10-16 digit!");
            return;
        }  

        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password);
        localStorage.setItem('userFullName', fullName);
        
        alert("Registrasi sukses. Silahkan login!");
        localStorage.setItem('isLoggedIn', "false");
        window.location.href = "login.html";
    });
}

/* Login */
if (loginForm) {
    loginForm.addEventListener("submit", function(e){
        e.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const storedEmail = localStorage.getItem('userEmail');
        const storedPassword = localStorage.getItem('userPassword');

        if(email === storedEmail && password === storedPassword){
            alert("Login sukses!");
            localStorage.setItem('isLoggedIn', "true");
            window.location.href = "home.html";
        }
        else{
            alert("Email atau kata sandi salah!");
            localStorage.setItem('isLoggedIn', "false");
        }
    });
}

/* Username */
if(h2Home){
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const fullName = localStorage.getItem('userFullName');
    
    if(isLoggedIn === "true" && fullName){
        h2Home.textContent = fullName;
    }
    else{
        h2Home.textContent = "Guest";
    }
}

/* Home Login Button */
if(logButton){
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if(isLoggedIn === "true"){
        logButton.textContent = "Log Out";
        logButton.addEventListener("click", function(e){
            e.preventDefault();

            localStorage.clear();
            alert("Anda telah sukses log out!")

            localStorage.setItem('isLoggedIn', "false");
            window.location.href = "login.html";
        });
    }
    else{
        logButton.textContent = "Log In";
        logButton.addEventListener("click", function(e){
            e.preventDefault();

            window.location.href = "login.html";
        });
    }
}

/* Car Insurance Checkout */
const carForm = document.getElementById('car-form');

if(carForm){
    carForm.addEventListener("submit", function(e){
        e.preventDefault();

        const brand = document.getElementById('car-brand').value;
        const model = document.getElementById('car-model').value;
        const year = document.getElementById('car-year').value;
        const price = document.getElementById('car-price').value;
        const plate = document.getElementById('car-plate').value;
        const machine = document.getElementById('car-machine').value;
        const id = document.getElementById('car-id').value;
        const owner = document.getElementById('car-owner').value;

        //validation 
        const nameRegex = /^[A-Za-z\s]+$/;
        const plateRegex = /^[A-Z]{1,2}\d{1,4}[A-Z]{1,3}$/;
        const machineRegex = /^[A-Z0-9]{11}$/;
        const idRegex = /^[A-Z0-9]{17}$/;
        const currentYear = new Date().getFullYear();

        if(!nameRegex.test(brand)){
            alert("Nama merk mobil harus hanya mengandung huruf dan spasi!");
            return;
        }
        if(!nameRegex.test(model)){
            alert("Nama jenis mobil harus hanya mengandung huruf dan spasi!");
            return;
        }
        if(year < 1900 || year > currentYear){
            alert("Masukkan tahun pembuatan diantara tahun 1900 dan tahun ${currentYear}!");
            return;
        }
        if(!(plateRegex).test(plate)){
            alert("Nomor plat tidak valid!");
            return;
        }
        if(!machineRegex.test(machine)){
            alert("Nomor mesin tidak valid! (Harus memiliki 11 karakter huruf dan angka.)");
            return;
        }
        if(!idRegex.test(id)){
            alert("Nomor Rangka tidak valid! (Harus memiliki 17 karakter huruf dan angka.)");
            return;
        }

        //local storage
        localStorage.setItem('carBrand', brand);
        localStorage.setItem('carModel', model);
        localStorage.setItem('carYear', year);
        localStorage.setItem('carPrice', price);
        localStorage.setItem('carPlate', plate);
        localStorage.setItem('carMachine', machine);
        localStorage.setItem('carId', id);
        localStorage.setItem('carOwner', owner);

        //calculate premi
        const localPrice = localStorage.getItem('carPrice');
        const carAge = currentYear - localStorage.getItem('carYear');
        let premi = 0;
        
        if(carAge >= 0 && carAge <= 3){
            premi = premi + 0.025*localPrice;
        }
        if(carAge > 3 && carAge <= 5 && localPrice < 200000000){
            premi = premi + 0.04*localPrice;
        }
        if(carAge > 3 && carAge <= 5 && localPrice > 200000000){
            premi = premi + 0.03*localPrice;
        }
        if(carAge > 5){
            premi = premi + 0.05*localPrice;
        }

        localStorage.setItem('carPremi', premi);

        let typeArray = localStorage.getItem('typeArray') ? localStorage.getItem('typeArray').split(',') : [];
        let premiArray = localStorage.getItem('premiArray') ? localStorage.getItem('premiArray').split(',') : [];
        let paymentArray = localStorage.getItem('paymentArray') ? localStorage.getItem('paymentArray').split(',') : [];
        let statusArray = localStorage.getItem('statusArray') ? localStorage.getItem('statusArray').split(',') : [];

        typeArray.push("Asuransi Mobil");
        premiArray.push(premi);
        paymentArray.push("Menunggu Pembayaran");
        statusArray.push("Belum Lunas");

        localStorage.setItem('typeArray', typeArray.join(','));
        localStorage.setItem('premiArray', premiArray.join(','));
        localStorage.setItem('paymentArray', paymentArray.join(','));
        localStorage.setItem('statusArray', statusArray.join(','));

        //make receipt
        const localBrand = localStorage.getItem('carBrand');
        const localModel = localStorage.getItem('carModel');
        const localYear = localStorage.getItem('carYear');
        const localPlate = localStorage.getItem('carPlate');
        const localMachine = localStorage.getItem('carMachine');
        const localId = localStorage.getItem('carId');
        const localOwner = localStorage.getItem('carOwner');
        const carPremi = localStorage.getItem('carPremi');

        localStorage.setItem('latestType', "Asuransi Mobil");
        localStorage.setItem('latestPremi', carPremi);

        const receipt = document.createElement('div');
        receipt.className = 'receipt-info';
        receipt.innerHTML = `
                <h2>Data Asuransi Berhasil Disimpan</h2>
                <hr>
                <p><strong>Nama Pemilik:</strong> ${localOwner}</p>
                <p><strong>Merk Mobil:</strong> ${localBrand}</p>
                <p><strong>Jenis Mobil:</strong> ${localModel}</p>
                <p><strong>Tahun Pembuatan:</strong> ${localYear}</p>
                <p><strong>Harga Mobil (ribuan):</strong> Rp ${localPrice}</p>
                <p><strong>Nomor Plat:</strong> ${localPlate}</p>
                <p><strong>Nomor Mesin:</strong> ${localMachine}</p>
                <p><strong>Nomor Rangka:</strong> ${localId}</p>
                <hr>
                <p><strong>Premi:</strong> Rp ${carPremi} per tahun</p>
                <br>
                <a href="checkout.html"><button class="insurance-checkout">Checkout</button></a>
            `;

        const container = document.querySelector('.car-info-right');
        container.appendChild(receipt);
    })
}

/* Health Insurance Checkout */
const hpForm = document.getElementById('hp-form');

if(hpForm){
    hpForm.addEventListener("submit", function(e){
        e.preventDefault();

        const name = document.getElementById('hp-name').value;
        const dob = document.getElementById('hp-dob').value;
        const birthDate = new Date(dob);
        const birthYear = birthDate.getFullYear();
        const job = document.getElementById('hp-job').value;
        const smoke = document.getElementById('hp-smoke').value;
        const hyper = document.getElementById('hp-hyper').value;
        const diabetes = document.getElementById('hp-diabetes').value;

        //validation 
        const nameRegex = /^[A-Za-z\s]+$/;
        const yesOrNo = /^[0-1]$/;

        if(!nameRegex.test(name)){
            alert("Nama harus hanya mengandung huruf dan spasi!");
            return;
        }
        if(!yesOrNo.test(smoke)){
            alert("Jawaban harus berupa angka 1 atau 0!");
            return;
        }
        if(!yesOrNo.test(hyper)){
            alert("Jawaban harus berupa angka 1 atau 0!");
            return;
        }
        if(!yesOrNo.test(diabetes)){
            alert("Jawaban harus berupa angka 1 atau 0!");
            return;
        }

        //local storage
        localStorage.setItem('hpName', name);
        localStorage.setItem('hpDob', dob);
        localStorage.setItem('hpBirthYear', birthYear);
        localStorage.setItem('hpJob', job);
        localStorage.setItem('hpSmoke', smoke);
        localStorage.setItem('hpHyper', hyper);
        localStorage.setItem('hpDiabetes', diabetes);

        //calculate premi
        let basePremi = 2000000;
        const smk = localStorage.getItem('hpSmoke');
        const hyp = localStorage.getItem('hpHyper');
        const dbt = localStorage.getItem('hpDiabetes');
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;
        let finalPremi = 0;
        let m = 0;

        if(age <= 20){
            m = 0.1;
        }
        if(age <= 35 && age > 20){
            m = 0.2;
        }
        if(age <= 50 && age > 35){
            m = 0.25;
        }
        if(age > 50){
            m = 0.4;
        }

        finalPremi = basePremi + (m*basePremi) + (smk*0.5*basePremi) + (hyp*0.4*basePremi) + (dbt*0.5*basePremi)

        localStorage.setItem('hpPremi', finalPremi);

        localStorage.setItem('latestType', "Asuransi Kesehatan");
        localStorage.setItem('latestPremi', finalPremi);

        let typeArray = localStorage.getItem('typeArray') ? localStorage.getItem('typeArray').split(',') : [];
        let premiArray = localStorage.getItem('premiArray') ? localStorage.getItem('premiArray').split(',') : [];
        let paymentArray = localStorage.getItem('paymentArray') ? localStorage.getItem('paymentArray').split(',') : [];
        let statusArray = localStorage.getItem('statusArray') ? localStorage.getItem('statusArray').split(',') : [];

        typeArray.push("Asuransi Mobil");
        premiArray.push(finalPremi);
        paymentArray.push("Menunggu Pembayaran");
        statusArray.push("Belum Lunas");

        localStorage.setItem('typeArray', typeArray.join(','));
        localStorage.setItem('premiArray', premiArray.join(','));
        localStorage.setItem('paymentArray', paymentArray.join(','));
        localStorage.setItem('statusArray', statusArray.join(','));

        //make receipt
        const localName = localStorage.getItem('hpName');
        const localDob = localStorage.getItem('hpDob');
        const localJob = localStorage.getItem('hpJob');
        const localSmoke = localStorage.getItem('hpSmoke') ? "Ya" : "Tidak";
        const localHyper = localStorage.getItem('hpHyper') ? "Ya" : "Tidak";
        const localDiabetes = localStorage.getItem('hpDiabetes') ? "Ya" : "Tidak";
        const localPremi = localStorage.getItem('hpPremi');

        const receipt = document.createElement('div');
        receipt.className = 'receipt-info';
        receipt.innerHTML = `
                <h2>Data Asuransi Berhasil Disimpan</h2>
                <hr>
                <p><strong>Nama:</strong> ${localName}</p>
                <p><strong>Tanggal Lahir:</strong> ${localDob}</p>
                <p><strong>Pekerjaan:</strong> ${localJob}</p>
                <p><strong>Merokok:</strong> ${localSmoke}</p>
                <p><strong>Hipertensi:</strong> Rp ${localHyper}</p>
                <p><strong>Diabetes:</strong> ${localDiabetes}</p>
                <hr>
                <p><strong>Premi:</strong> Rp ${localPremi} per tahun</p>
                <br>
                <a href="checkout.html"><button class="insurance-checkout">Checkout</button></a>
            `;

        const container = document.querySelector('.hp-info-right');
        container.appendChild(receipt);
    })
}

/* Life Insurance Checkout */
const lifeForm = document.getElementById('life-form');

if(lifeForm){
    lifeForm.addEventListener("submit", function(e){
        e.preventDefault();

        const name = document.getElementById('life-name').value;
        const dob = document.getElementById('life-dob').value;
        const birthDate = new Date(dob);
        const birthYear = birthDate.getFullYear();
        const baggage = document.getElementById('life-baggage').value;

        //validation 
        const nameRegex = /^[A-Za-z\s]+$/;

        if(!nameRegex.test(name)){
            alert("Nama harus hanya mengandung huruf dan spasi!");
            return;
        }

        //local storage
        localStorage.setItem('lifeName', name);
        localStorage.setItem('lifeDob', dob);
        localStorage.setItem('lifeBirthYear', birthYear);
        localStorage.setItem('lifeBaggage', baggage);

        //calculate premi
        let basePremi = localStorage.getItem('lifeBaggage')
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;
        let finalPremi = 0;
        let m = 0;

        if(age <= 30){
            m = 0.002;
        }
        if(age <= 50 && age > 30){
            m = 0.004;
        }
        if(age > 50){
            m = 0.01;
        }

        finalPremi = basePremi*m;

        localStorage.setItem('lifePremi', finalPremi);

        localStorage.setItem('latestType', "Asuransi Jiwa");
        localStorage.setItem('latestPremi', finalPremi);

        let typeArray = localStorage.getItem('typeArray') ? localStorage.getItem('typeArray').split(',') : [];
        let premiArray = localStorage.getItem('premiArray') ? localStorage.getItem('premiArray').split(',') : [];
        let paymentArray = localStorage.getItem('paymentArray') ? localStorage.getItem('paymentArray').split(',') : [];
        let statusArray = localStorage.getItem('statusArray') ? localStorage.getItem('statusArray').split(',') : [];

        typeArray.push("Asuransi Mobil");
        premiArray.push(finalPremi);
        paymentArray.push("Menunggu Pembayaran");
        statusArray.push("Belum Lunas");

        localStorage.setItem('typeArray', typeArray.join(','));
        localStorage.setItem('premiArray', premiArray.join(','));
        localStorage.setItem('paymentArray', paymentArray.join(','));
        localStorage.setItem('statusArray', statusArray.join(','));

        //make receipt
        const localName = localStorage.getItem('lifeName');
        const localDob = localStorage.getItem('lifeDob');
        const localBaggage = localStorage.getItem('lifeBaggage');
        const localPremi = localStorage.getItem('lifePremi');

        const receipt = document.createElement('div');
        receipt.className = 'receipt-info';
        receipt.innerHTML = `
                <h2>Data Asuransi Berhasil Disimpan</h2>
                <hr>
                <p><strong>Nama:</strong> ${localName}</p>
                <p><strong>Tanggal Lahir:</strong> ${localDob}</p>
                <p><strong>Besar Tanggungan:</strong> ${localBaggage}</p>
                <hr>
                <p><strong>Premi:</strong> Rp ${localPremi} per bulan</p>
                <br>
                <a href="checkout.html"><button type="submit" class="insurance-checkout">Checkout</button></a>
            `;

        const container = document.querySelector('.life-info-right');
        container.appendChild(receipt);
    })
}

//checkout stuff
const typeSpan = document.getElementById('insurance-type');
const premiSpan = document.getElementById('insurance-premi');

if(typeSpan){
    const latestType = localStorage.getItem('latestType');
    typeSpan.textContent = latestType;
}

if(premiSpan){
    const latestPremi = localStorage.getItem('latestPremi');
    premiSpan.textContent = latestPremi;
}

//pay button
const payBtn = document.getElementById('payment-btn');

if(payBtn){
    payBtn.addEventListener("click", function(){
        const paymentOpt = document.getElementById('payment-opt').value;

        let paymentArray = localStorage.getItem('paymentArray') ? localStorage.getItem('paymentArray').split(',') : [];
        let statusArray = localStorage.getItem('statusArray') ? localStorage.getItem('statusArray').split(',') : [];

        if (paymentArray.length > 0) {
            const lastIndex = paymentArray.length - 1;
            paymentArray[lastIndex] = paymentOpt;
            statusArray[lastIndex] = "Lunas";

            localStorage.setItem('paymentArray', paymentArray.join(','));
            localStorage.setItem('statusArray', statusArray.join(','));

            alert("Pembayaran berhasil!");

            window.location.href = "history.html";
        }
    });
}

const historyTable = document.getElementById('history-table');

function renderTable() {
    const tableBody = historyTable.querySelector('tbody');

    tableBody.innerHTML = '';

    const typeArray = localStorage.getItem('typeArray') ? localStorage.getItem('typeArray').split(',') : [];
    const premiArray = localStorage.getItem('premiArray') ? localStorage.getItem('premiArray').split(',') : [];
    const paymentArray = localStorage.getItem('paymentArray') ? localStorage.getItem('paymentArray').split(',') : [];
    const statusArray = localStorage.getItem('statusArray') ? localStorage.getItem('statusArray').split(',') : [];

    if (typeArray.length === 0) {
        const noHistory = document.createElement('h3');
        noHistory.textContent = 'Tidak ada riwayat transaksi.';
        noHistory.style.color = 'white';
        tableBody.appendChild(noHistory);
    }
    else {
        const headerRow = document.createElement('tr');
        const numberHeader = document.createElement('th');
        numberHeader.textContent = 'No';
        headerRow.appendChild(numberHeader);

        const typeHeader = document.createElement('th');
        typeHeader.textContent = 'Jenis Asuransi';
        headerRow.appendChild(typeHeader);

        const premiHeader = document.createElement('th');
        premiHeader.textContent = 'Premi';
        headerRow.appendChild(premiHeader);

        const paymentHeader = document.createElement('th');
        paymentHeader.textContent = 'Pembayaran';
        headerRow.appendChild(paymentHeader);

        const statusHeader = document.createElement('th');
        statusHeader.textContent = 'Status';
        headerRow.appendChild(statusHeader);

        tableBody.appendChild(headerRow);

        for (let i = 0; i < typeArray.length; i++) {
            const row = document.createElement('tr');

            const numberCell = document.createElement('td');
            numberCell.textContent = i + 1;
            row.appendChild(numberCell);

            const typeCell = document.createElement('td');
            typeCell.textContent = typeArray[i];
            row.appendChild(typeCell);

            const premiCell = document.createElement('td');
            premiCell.textContent = `Rp ${premiArray[i]}`;
            row.appendChild(premiCell);

            const paymentCell = document.createElement('td');
            paymentCell.textContent = paymentArray[i];
            row.appendChild(paymentCell);

            const statusCell = document.createElement('td');
            statusCell.textContent = statusArray[i];
            row.appendChild(statusCell);

            tableBody.appendChild(row);
        }
    }
}

if (historyTable) {
    renderTable();
}

