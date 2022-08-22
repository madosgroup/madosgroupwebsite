var DataTobeBeValidate = {}
formData = (event) => {
    event.stopPropagation();
    // event.preventDefault();
    var value = event.target.value;
    var name = event.target.name;

    return (DataTobeBeValidate = { ...DataTobeBeValidate, [name]: value.toLowerCase() })
}

submitHandler = (event) => {
    event.stopPropagation();
    event.preventDefault();

    var form = document.querySelector('.contact_form'),
        gettingTheform = document.querySelectorAll('.form-group'),
        formError = false,
        emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;


    for (let i = 0; i < gettingTheform.length; i++) {
        var actualINput = gettingTheform[i].querySelector('input')
        if (actualINput !== null) {

            var rule = actualINput.getAttribute('data-rule')
            if (rule !== undefined) {
                var InputError = false;
                var pos = rule.indexOf(':', 0);
                if (pos >= 0) {
                    var exp = rule.substring(pos + 1, rule.length);
                    rule = rule.substring(0, pos)
                } else {
                    rule = rule.substring(pos + 1, rule.length)
                }

                switch (rule) {
                    case 'required':
                        if (actualINput.value === '') {
                            formError = InputError = true;
                        }
                        break;
                    case 'minlen':
                        if (actualINput.value.length < parseInt(exp)) {
                            formError = InputError = true

                            let validate = actualINput.nextElementSibling
                            validate.innerHTML = `${InputError ?
                                actualINput.getAttribute('data-msg') !== undefined
                                    && actualINput.getAttribute('data-msg') !== null ?
                                    actualINput.getAttribute('data-msg')
                                    : 'wrong input'
                                : ''}`
                            validate.style.display = 'block'

                        } else {
                            formError = InputError = false
                            let validate = actualINput.nextElementSibling
                            validate.style.display = 'none'

                            // console.log(actualINput)
                        } break;
                    case 'email':
                        if (!emailExp.test(actualINput.value)) {
                            formError = InputError = true

                            let validate = actualINput.nextElementSibling
                            validate.innerHTML = `${InputError ? actualINput.getAttribute('data-msg') !== undefined
                                && actualINput.getAttribute('data-msg') !== null ?
                                actualINput.getAttribute('data-msg')
                                : 'wrong input'
                                : ''}`
                            validate.style.display = 'block'
                            // console.log(validate)

                        } else {
                            formError = InputError = false
                            let validate = actualINput.nextElementSibling
                            validate.style.display = 'none'

                            console.log('passed verification')
                        } break;
                    case 'regexp':
                        exp = new RegExp(exp);
                        if (!exp.test(actualINput.value)) {
                            formError = InputError = true;

                        } break
                }
            }
        } else {
            var actualINput = gettingTheform[i].querySelector('textarea')
            var rule = actualINput.getAttribute('data-rule')

            if (rule !== undefined) {
                var InputError = false;
                var pos = rule.indexOf(':', 0);
                if (pos >= 0) {
                    var exp = rule.substring(pos + 1, rule.length);
                    rule = rule.substring(0, pos)
                } else {
                    rule = rule.substring(pos + 1, rule.length)
                }

                switch (rule) {
                    case 'required':
                        if (actualINput.value === '') {
                            formError = InputError = true;


                            let validate = actualINput.nextElementSibling
                            validate.innerHTML = `${InputError ?
                                actualINput.getAttribute('data-msg') !== undefined
                                    && actualINput.getAttribute('data-msg') !== null ?
                                    actualINput.getAttribute('data-msg')
                                    : 'wrong input'
                                : ''}`
                            validate.style.display = 'block'
                        } else {
                            formError = InputError = false
                            let validate = actualINput.nextElementSibling
                            validate.style.display = 'none'

                            console.log('passed verification')
                        }
                        break;
                    case 'minlen':
                        if (actualINput.value.length < parseInt(exp)) {
                            formError = InputError = true
                            break;
                        }
                }
            }
        }
    }

    if (formError === false) {
        document.querySelector('.loading').style.display = 'block'
        document.querySelector('.sent-message').style.display = 'none'
        document.querySelector('.error-message').style.display = 'none'

        var date = new Date
        fetch("https://mados-mailer.herokuapp.com/api/mailer/sendmail/", {
            method: "post",
            body: JSON.stringify({
                subject: DataTobeBeValidate.subject,
                variables: {
                    client: DataTobeBeValidate.name,
                    email: DataTobeBeValidate.email,
                    message: DataTobeBeValidate.message,
                    dateandtime: date
                },
                email: ["info@madosgroup.com", "jamesamuli1998@gmail.com", "atibudan2@gmail.com"],
                template: 'madosgroup'
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then((response) => {
            document.querySelector('.loading').style.display = 'none'
            document.querySelector('.sent-message').style.display = 'block'
            form.reset()
            return response.json()

        }).catch((error) => {
            document.querySelector('.loading').style.display = 'none'
            document.querySelector('.error-message').style.display = 'block'
            return error
        })

    } else {

    }
} 


// news letter

submitNewsletter = (event)=>{
    event.stopPropagation();
    event.preventDefault();

    var newsLetterData = document.querySelector('#newsletter').value

    fetch("https://newsletterlaravel1.herokuapp.com/api/addmail",{
        method : "post",
        body : JSON.stringify({
            email : newsLetterData,
            AppCode : "1235b"
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    }).then((response) =>{
        console.log(response.status)
    }).catch((error)=>{
        console.log(error)
    })
}