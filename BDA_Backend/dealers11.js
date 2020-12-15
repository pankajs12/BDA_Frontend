
const express = require('express');
const base64ToImage = require('base64-to-image');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require("mongodb").MongoClient;
const  ObjectId = require("mongodb").ObjectID;
const stripe = require("stripe")(process.env.STRIPE_KEY);
const CONNECTION_URL = "mongodb://root:RRpbkAYBEJA2@35.202.6.114:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false";
const DATABASE_NAME = "BDASpanish";
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt'); // bcrypt password
const winston = require('winston');
const fs = require('fs');
const saltRounds = 12; // salt
dotenv.config();
const transport = nodemailer.createTransport({
	host: 'smtp.gmail.com',
    service: 'gmail',
	port: 465,
	secure: true,
	encryption:'SSL',
    auth: {
        user: 'amitchetu9@gmail.com',
        pass: 'akjubrblwjlonsjx',
    },
});

const app = express();
var database, collection;
var rand;
var insertedId;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));

const logger = winston.createLogger({
	format: winston.format.json(),
	defaultMeta: { service: 'Logs' },
	transports: [
	//   new winston.transports.File({ filename: 'error.log', level: 'error' }),
	  new winston.transports.File({ filename: 'combined.log' }),
	],
  });

app.post("/emailValidation",(request, response) => {
	console.log('validation email',request.body);
	collection.findOne({emailaddress: request.body.data}, function (err, success) {
		if(err) console.log(err);
		if(success){
			console.log('This email is already registered, Please try using another email');
			response.send('This email is already registered, Please try using another email')
		}else{
			console.log('data not found');
			response.send('success');
		}
    })
})

app.get("/",(req, res) => {
	return res.status(200).send('hello');
})

app.post("/insertDealerInformation", (request, response) => {
	console.log('insert form data ==========',request.body.data.imageFile.baseEncImage);

	var base64Str = request.body.data.imageFile.baseEncImage;
	var path ='./uploads/';
	var optionalObj = {'fileName': 'img-' + Date.now(), 'type':'jpg'};
	
	var imageInfo = base64ToImage(base64Str,path,optionalObj); 
	
	bcrypt.hash(request.body.data.password, saltRounds)
	.then(function(hashedPassword){
		let data = {
			dealer_name: request.body.data.dealer_name,
			email: request.body.data.email,
			phone: request.body.data.phone,
			address: request.body.data.address,
			state: request.body.data.state,
			city: request.body.data.city,
			zip_code: request.body.data.zip_code,
			monday_sales_hours: request.body.data.monday_sales_hours,
			tuesday_sales_hours: request.body.data.tuesday_sales_hours,
			wednesday_sales_hours: request.body.data.wednesday_sales_hours,
			thursday_sales_hours: request.body.data.thursday_sales_hours,
			friday_sales_hours: request.body.data.friday_sales_hours,
			saturday_sales_hours: request.body.data.saturday_sales_hours,
			sunday_sales_hours: request.body.data.sunday_sales_hours,
			monday_service_hours: request.body.data.monday_service_hours,
			wednesday_service_hours: request.body.data.wednesday_service_hours,
			thursday_service_hours: request.body.data.thursday_service_hours,
			friday_service_hours: request.body.data.friday_service_hours,
			saturday_service_hours: request.body.data.saturday_service_hours,
			sunday_service_hours: request.body.data.sunday_service_hours,
			monday_parts_hours: request.body.data.monday_parts_hours,
			tuesday_parts_hours: request.body.data.tuesday_parts_hours,
			wednesday_parts_hours: request.body.data.wednesday_parts_hours,
			thursday_parts_hours: request.body.data.thursday_parts_hours,
			friday_parts_hours: request.body.data.friday_parts_hours,
			saturday_parts_hours: request.body.data.saturday_parts_hours,
			sunday_parts_hours: request.body.data.sunday_parts_hours,
			content_translation: request.body.data.content_translation,
			dealer_id: request.body.data.dealer_id,
			rooftopId: request.body.data.rooftopId,
			longitude: request.body.data.longitude,
			hero_image: request.body.data.hero_image,
			english_website_url: request.body.data.english_website_url,
			sales_phone: request.body.data.sales_phone,
			dealer_type: request.body.data.dealer_type,
			emailaddress : request.body.data.email,
			price : request.body.data.payAmount,
			description : request.body.data.description,
			password: hashedPassword,
			confirm_password: hashedPassword,
			activate_suspend_status: request.body.data.activate_suspend_status,	
			verification_status: request.body.data.verification_status,
			approve_status: request.body.data.approve_status,
			roles: request.body.data.roles,
			subscription_date: request.body.data.subscription_date,
			subscription_expiration_date: request.body.data.subscription_expiration_date,
			imageInfo: imageInfo,
			imageFile: base64Str,
		}
		console.log('hashed password', hashedPassword);

			const mailOptions = {
				from: process.env.FROM,
				to: data.emailaddress,
				subject: 'BDASpanish!',
				html: `<p>Hi ${data.dealer_name},</p><p>Thank you for registering us</p><p><b>Below you find your payment receipt:-</b></p><p>Subscription Type: ${data.description}.</p><p>Amount Paid: $ ${data.price}.</p><p>Thank you for your business.</br></br></br></br></br>\n\n\n\n\n</p><b>Thanks & Regards</b> <p>Website: <a href="https://buscadordeauto.com/">Buscadordeauto.com</a></p><p><img style="width:150px;" src="https://storage.googleapis.com/brand-assets/LogoBusiness_transp.png"></p>`
			};
			const mailOptions1 = {
				from: process.env.FROM,
				to: process.env.TO,
				subject: 'Registered Dealers Information!',
				text: `Company Name: ${data.dealer_name}.\n\n Dealer Contact Name: ${data.contactname}.\n\n Dealer Contact Number: ${data.contactnumber}.\n\n Email Address: ${data.emailaddress}.\n\n Address : ${data.address}.\n\n City: ${data.city}.\n\n State: ${data.state}.\n\n Zip Code: ${data.zipcode}.\n\n Inventory Provider: ${data.inventoryprovider}. \n\n Price: $ ${data.price}.\n\n Description: ${data.description}.`,
			};
			rand=Math.floor((Math.random() * 100) + 54);
			// var link="http://"+request.get('host')+"/verify?id="+rand;
			var link = "http://localhost:3000/verification?id="+rand;
			const mailOptions2={
				to :  data.emailaddress,
				subject : "Please confirm your Email account",
				html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
			}
			collection.insertOne(data, (error, result) => {
				if(error) {
					return response.status(500).send(error);
				}
				transport.sendMail(mailOptions2, (error, info) => {
					if (error) {
						console.log(error);
					}
					else {
						console.log('Email sent: ' + info.response);
					}
				});
				transport.sendMail(mailOptions1, (error, info) => {
					if (error) {
						console.log(error);
					}
					else {
						console.log('Email sent: ' + info.response);
					}
				});
				transport.sendMail(mailOptions, (error, info) => {
					if (error) {
						console.log(error);
					}
					else {
						console.log('Email sent: ' + info.response);
					}
				});
				console.log('form submitted', result.insertedId);
				insertedId = result.insertedId;
				return response.send(result.result);
			});
		}).catch((error) => {
			if(error){
				console.log(error)
			}
		})
	
});

app.post("/payment", (request, response) => {
	console.log('request for payment',request.body);
	var amount = request.body.amount;
	var description = request.body.description;
	return stripe.customers
	  .create({
		email: request.body.email, 
		source: request.body.source
	  })
	  .then((customer) => {
		return stripe.charges.create({
		customer: customer.id,
		amount: amount*100,
		currency: 'usd',
		description: description,
		
	  });
	  })
	  .then((result) => {
		console.log('Success');
	  })
	  .catch((err) => {
		console.log(err);
	  });
});


// email verification start

app.post('/verify',function(req,response){
	console.log('verification id',req.body.id);
	if(req.body.id !== "")
	{
	console.log("Domain is matched. Information is from Authentic email");
	if(req.body.id==rand)
	{
		collection.updateOne({"_id":ObjectId(insertedId)}, {$set:{"verification_status":1}}, function(err, res) {
			if (err){
				console.log("Something wrong when updating data!");
				return response.send(err);
			}else{
				console.log('data updated');
				return response.status(200).send();
			}
		});
	}
	else
	{
		console.log("email is not verified");
		return response.status(404).send();
	}
	}
	else
	{
	res.end("<h1>Request is from unknown source");
	}
});

// email verification end

app.post("/login", (request, response) => {
	console.log('request login',request.body);
	collection.find({ email: request.body.email }).toArray((err,user) => {
		if(err)
		console.log(err)
		if(!user[0]){
			console.log('user not found');
			return response.status(404).send()
		}
		else if(user[0].verification_status !== 1){
			console.log('user not verified');
			return response.status(403).send()
		}
		else if(user[0].approve_status !== 1){
			console.log('user not approved');
			return response.status(405).send()
		}
		else if(user[0].activate_suspend_status == 0){
			console.log('Account has been suspended');
			return response.status(406).send();
		}
		else{
			bcrypt.compare(request.body.password, user[0].password, function(err, isMatch) {
				if (err) {
				  throw err
				} else if (!isMatch) {
				  	console.log("Password doesn't match!");
					return response.status(400).send('Invalid Password');
				} else {
				  console.log("Password matched!", user[0]._id);
				return response.send(user);

				}
			  })

		}
	})

})

app.post("/forgot",(request, response) => {
	console.log('email id for forgotpassword', request.body);

	collection.find({ emailaddress: request.body.email }).toArray((err,user) => {
		if(err)
		console.log(err)
		if(!user[0]){
			console.log('user not found');
			return response.status(404).send('user not found')
		}
		else{
			console.log('user id', user[0]._id);
			var userid = user[0]._id
			//email options
			const mailOptionsforgotPasswor = {  
                to: request.body.email,  
                from: 'Ga@bdaspanish.com',  
                subject: 'Password Reset',  
                text: 'You are receiving this because you have requested the reset of the password for your account.\n\n' +  
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +  
                    'http://localhost:3000/Cambia%20la%20contrase%C3%B1a?id=' + userid + '\n\n' +  
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'  
			};  

			transport.sendMail(mailOptionsforgotPasswor, (error, info) => {
				if (error) {
					console.log(error);
				}
				else {
					console.log('Email sent: ' + info.response);
					return response.status(200).send('email successfully sent');
				}
			});
			
		}
	})

})

app.post("/change", (request, response) => {
	console.log('change password value',request.body);
	bcrypt.hash(request.body.password, saltRounds)
	.then(function(hashedPassword){
			let password = hashedPassword;
			let confirm_password = hashedPassword;
		console.log('forgot hashed password', hashedPassword);
		collection.updateOne({"_id":ObjectId(request.body.user_id)}, {$set:{"password":password, "confirm_password":confirm_password}}, function(err, res) {
			if (err){
				console.log("Something wrong when updating data!");
				return response.status(400).send(err);
			}else{
				console.log('password updated');
				return response.status(200).send(res);
			}

		});
			
		}).catch((error) => {
			if(error){
				console.log(error)
			}
		})
	
})

app.post("/getAllDealersDataForDealersDashboard", (request, response) => {
	collection.find({"subscription_date":request.body.subscription_date}).toArray(function(err, res) {
		if (err){
			console.log('errors while fetching all data');
			return response.status(400).send();
		};
		return response.send(res);
	  });
});

app.get("/getAllDealersData", (request, response) => {
	collection.find({}).toArray(function(err, res) {
		if (err){
			console.log('errors while fetching all data');
			return response.status(400).send();
		};
		return response.send(res);
	  });
});

app.get("/getAllDealersDataDealerManagement", (request, response) => {
	collection.find({}).toArray(function(err, res) {
		if (err){
			console.log('errors while fetching all data');
			return response.status(400).send();
		};
		return response.send(res);
	  });
});

//get dealers data by id
app.post("/getDealersDataById", (request, response) => {
	collection.find({"_id":ObjectId(request.body.id)}).toArray(function(err, res) {
		if (err){
			console.log('errors while fetching all data');
			return response.status(400).send();
		};
		return response.send(res);
	  });
});


// homenet inventory insert and update endpoint

app.post("/insertDealersHomenetInventory", (request, response) => {
	logger.log({
		level: 'info',
		message:  request.body
	  });
	// fs.writeFile('test.log', JSON.stringify(request.body, null, 4), function(err, result) {
	// 	if(err) console.log('error', err);
	//    });
//    response.send('hello, world!')
	// console.log('insert data',request.body.vehicles);
	// process.exit();
	var invData = request.body.vehicles;
	invData.forEach(element => {
		// console.log('elements============', element.vehicle.vehicleId.vin);
		if(element.context.action == "Update"){
			console.log('update inventory function called');
			dealersInventory.find({"vehicle.vehicleId.vin":element.vehicle.vehicleId.vin}).toArray(function(err, res) {
				if(err)
				console.log(err)
				if(!res[0]){
					dealersInventory.insertOne(element, (error, result) => {
						if(error) {
							console.log('errorssssss',error);
							logger.info('Error : \n');
							logger.error(error);
							return response.status(500).send(error);
						}else{
							// logger.info(request.body);
							console.log('Data  inserted successfully');
							// return response.json({"Message" : "Data Inserted Successfully"});
						}
					});
				}
				else{
					dealersInventory.updateOne({"vehicle.vehicleId.vin": element.vehicle.vehicleId.vin}, {$set: element}, function(err, res) {
						if (err){
							console.log("Something wrong while updating data!");
							logger.log({
								level: 'Error',
								message:  err
							  });
							return response.json({"Message" : "Something wrong while updating data!"});
						}else{
							console.log('updated');
							logger.log({
								level: 'info',
								message:  "Data  updated successfully"
							  });
							return response.json({"Message" : "Data Updated Successfully"});
						}
					});	
				}
				
			  });
		}
		if(element.context.action == "Insert"){
			console.log('insert inventory function called============', element.vehicle.vehicleId.vin);
			dealersInventory.insertOne(element, (error, result) => {
				if(error) {
					console.log('errorssssss',error);
					logger.log({
						level: 'Error',
						message:  error
					  });
					return response.status(500).send(error);
				}else{
					console.log('Data  inserted successfully');
					logger.log({
						level: 'info',
						message:  "Data  inserted successfully"
					  });
					// return response.json({"Message" : "Data Inserted Successfully"});
				}
			});
		}	
	})
	
});

//delete homenet inventory data

app.post("/deleteDealersHomenetInventory", (request, response) => {
	var deleteData = request.body.vehicles;
	deleteData.forEach(element => {
		if(element.context.action == 'Delete'){
			console.log('delete method called');
			dealersInventory.deleteOne({"vehicle.vehicleId.vin": element.vehicle.vehicleId.vin}, function(err, res) {
				if (err){
					console.log("Something wrong while deleting data!");
					//   return response.json({"Message" : "Something went wrong while deleting data!"});
				}else{
					// console.log('deleted');
					return response.json({"Message" : "Data Deleted"});
				}
			});
		}
	})
	
})

// get all dealers homenet inventory
app.get("/getAllDealersHomenetInventory", (request, response) => {
	dealersInventory.find({}).toArray(function(err, res) {
		if (err){
			console.log('errors while fetching all data');
			logger.log({
				level: 'info',
				message:  err
			  });
			return response.status(400).send();
		};
		return response.send(res);
	  });
});

//get dealer details by dealer id

app.post("/getDealersDetailByDealerId", (request, response) => {
	var dealerId = request.body.dealerId.replace("_", "-");
	collection.find({"dealer_id": dealerId }).toArray(function(err, res) {
		if (err){
			return response.status(400).send();
		};
		return response.send(res);
	  });
});

//get all homenet inventory of specific dealer according to dealerId

app.post("/getHomenetInventoryByDealerId", (request, response) => {
	console.log('get specific dealers homenet inventory by dealer id',request.body.dealerId.replace("_", "-"));
	// process.exit();
	var dealerId = request.body.dealerId.replace("_", "-");
	dealersInventory.find({"vehicle.vehicleId.dealerId": dealerId }).toArray(function(err, res) {
		if (err){
			return response.status(400).send();
		};
		// console.log('dealers data------------=-=-=-=-=-',res);
		return response.send(res);
	  });
});



app.post("/getAllDealersHomenetInventoryById", (request, response) => {
	console.log('get all dealers homenet inventory by id',request.body.vinId);
	dealersInventory.find({"vehicle.vehicleId.vin":request.body.vinId }).toArray(function(err, res) {
		if (err){
			return response.status(400).send();
		};
		return response.send(res);
	  });
});

app.post("/insertPaymentPrice", (request, response) => {
	console.log('request data',request.body);
	paymentPrice.insertOne(request.body, (error, result) => {
				if(error) {
					console.log('errorssssss',error);
					return response.status(500).send(error);
				}else{
					return response.status(200).send('Inserted Successfully');
				}
			});
});

app.get("/getAllPaymentPrice", (request, response) => {
	paymentPrice.find({}).toArray(function(err, res) {
		if (err){
			console.log('errors while fetching all data');
			return response.status(400).send();
		};
		return response.send(res);
	  });
});

app.post('/paymentPriceUpdate',function(req,response){
	console.log('update form data',req.body);
	var update = {
			monthly_price  :  req.body.monthly_price,
			quarterly_price  :  req.body.quarterly_price,
			yearly_price  :  req.body.yearly_price,
	}
	if(req.body.id !== "")
	{
		paymentPrice.updateOne({"_id":ObjectId(req.body.id)}, {$set: update}, function(err, res) {
			if (err){
				console.log("Something wrong when updating data!");
				return response.send(err);
			}else{
				console.log('payment price updated');
				return response.status(200).send();
			}
		});
	}
	else
	{
		console.log("id not found");
		return response.status(404).send();
	}	
	
});

// approve status

app.post('/approve',function(request,response){
	console.log('approve status id',request.body.id);
	if(request.body.id !== "")
	{
		collection.find({ "_id": ObjectId(request.body.id) }).toArray((err,user) => {
			if(err)
			console.log(err)
			if(!user[0]){
				console.log('user not found');
				return response.status(404).send('user not found')
			}
			else if(user[0].approve_status == 1){
				return response.status(304).send('already approved');
			}
			else{
				collection.updateOne({"_id":ObjectId(request.body.id)}, {$set:{"approve_status":1}}, function(err, res) {
					if (err){
						console.log(err);
					}else{
						console.log('Approved');
						//email options
						const mailOptionsSuspendAccount = {  
							to: user[0].emailaddress,  
							from: 'Ga@bdaspanish.com',  
							subject: 'Account Approved',  
							text: 'Your account has been approved now you can login by using your credentials.\n\n'
						};
						transport.sendMail(mailOptionsSuspendAccount, (error, info) => {
							if (error) {
								console.log(error);
							}
							else {
								console.log('Email sent: ' + info.response);
								return response.status(200).send('email successfully sent');
							}
						});
					}
				});
			}
		})
	}
	else
	{
		console.log("id not found");
		return response.status(404).send();
	}	
});

//chanage approve status (reject)

app.post('/reject',function(request,response){
	console.log('reject status id',request.body.id);
	if(request.body.id !== "")
	{
		collection.find({ "_id": ObjectId(request.body.id) }).toArray((err,user) => {
			if(err)
			console.log(err)
			if(!user[0]){
				console.log('user not found');
				return response.status(404).send('user not found')
			}
			else if(user[0].approve_status == 0){
				return response.status(304).send('already rejected');
			}
			else{
				collection.updateOne({"_id":ObjectId(request.body.id)}, {$set:{"approve_status":0}}, function(err, res) {
					if (err){
						console.log(err);
					}else{
						console.log('Account rejected');
						//email options
						const mailOptionsSuspendAccount = {  
							to: user[0].emailaddress,  
							from: 'Ga@bdaspanish.com',  
							subject: 'Account Rejected',  
							text: 'Your account has been rejected from admin side.\n\n'
						};
						transport.sendMail(mailOptionsSuspendAccount, (error, info) => {
							if (error) {
								console.log(error);
							}
							else {
								console.log('Email sent: ' + info.response);
								return response.status(200).send('email successfully sent');
							}
						});
					}
				});
			}
		})
	}
	else
	{
		console.log("id not found");
		return response.status(404).send();
	}	
});

//roles

app.post("/changeRole",(request, response) => {
	collection.find({ "_id": ObjectId(request.body.id) }).toArray((err,user) => {
		if(err)
		console.log(err)
		if(!user[0]){
			return response.status(404).send('user not found')
		}
		else if(user[0].roles == 0){
			collection.updateOne({"_id":ObjectId(request.body.id)}, {$set:{"roles":1}}, function(err, res) {
				if (err){
					console.log(err);
				}else{
					return response.status(200).send('Roles Changed to Admin');
				}
			});
		}
		else{
			collection.updateOne({"_id":ObjectId(request.body.id)}, {$set:{"roles":0}}, function(err, res) {
				if (err){
					console.log(err);
				}else{
					return response.status(200).send('Roles Changed to Dealer');
				}
			});
		}
	})

})

//suspend dealers

app.post("/suspend",(request, response) => {
	collection.find({ "_id": ObjectId(request.body.id) }).toArray((err,user) => {
		if(err)
		console.log(err)
		if(!user[0]){
			console.log('user not found');
			return response.status(404).send('user not found')
		}
		else if(user[0].activate_suspend_status == 0){
			return response.status(304).send('already suspended');
		}
		else{
			console.log('suspend email id', user[0].emailaddress);
			collection.updateOne({"_id":ObjectId(request.body.id)}, {$set:{"activate_suspend_status":0}}, function(err, res) {
				if (err){
					console.log(err);
				}else{
					console.log('Account suspended');
					var userid = user[0]._id;
					//email options
					const mailOptionsSuspendAccount = {  
						to: user[0].emailaddress,  
						from: 'Ga@bdaspanish.com',  
						subject: 'Account Suspended',  
						text: 'Your account has been suspended for'  +  user[0].description  +  'non-payment.\n\n' +  
							'You have 5 days to reactivate account or it would be cancelled and a new registration would be required:\n\n' +  
							'For Payment:' + 'http://localhost:3000/suspendPayment?id=' + userid + '\n\n'   
					};  

					transport.sendMail(mailOptionsSuspendAccount, (error, info) => {
						if (error) {
							console.log(error);
						}
						else {
							console.log('Email sent: ' + info.response);
							return response.status(200).send('email successfully sent');
						}
					});
				}
			});
		}
	})

})

//activate dealers
app.post("/activate",(request, response) => {
	collection.find({ "_id": ObjectId(request.body.id) }).toArray((err,user) => {
		if(err)
		console.log(err)
		if(!user[0]){
			console.log('user not found');
			return response.status(404).send('user not found')
		}
		else if(user[0].activate_suspend_status == 1){
			return response.status(304).send();
		}
		else{
			console.log('activate email id', user[0].emailaddress);
			collection.updateOne({"_id":ObjectId(request.body.id)}, {$set:{"activate_suspend_status":1}}, function(err, res) {
				if (err){
					console.log(err);
				}else{
					console.log('account activated');
					const mailOptionsActivateAccount = {  
						to: user[0].emailaddress,  
						from: 'Ga@bdaspanish.com',  
						subject: 'Account Suspended',  
						text: 'Your account has been activated for'  +  user[0].description  +  'non-payment.\n\n'
					};  
					transport.sendMail(mailOptionsActivateAccount, (error, info) => {
						if (error) {
							console.log(error);
						}
						else {
							console.log('Email sent: ' + info.response);
							return response.status(200).send('email successfully sent');
						}
					});
				}
			});
			//email options
		}
	})
})

// renew subscription

app.post("/updatePaymentDealerInformation", (req, response) => {
	console.log('renew subscription',req.body.data.payAmount);
	var renew = {
		price: req.body.data.payAmount,
		description: req.body.data.description,
		subscription_date: req.body.data.subscription_date,
		subscription_expiration_date: req.body.data.subscription_expiration_date,
	}
	if(req.body.data.id !== "")
	{
		collection.updateOne({"_id": ObjectId(req.body.data.id)}, {$set: renew}, function(err, res) {
			if (err){
				console.log("Something wrong when updating data!");
				return response.send(err);
			}else{
				console.log('data updated');
				//email options
				const mailOptionsUpdatePayment = {  
					to: process.env.TO,  
					from: 'Ga@bdaspanish.com',
					subject: 'Account Renewed',  
					text: 'Dealer has paid subscription type : '  +  req.body.data.description  +  '\n\n' +  
						'User Id:' + req.body.data.id+'\n\n'
				};  

				transport.sendMail(mailOptionsUpdatePayment, (error, info) => {
					if (error) {
						console.log(error);
					}
					else {
						console.log('Email sent: ' + info.response);
						return response.status(200).send('email successfully sent');
					}
				});
				return response.status(200).send();
			}
		});
	}
	else
	{
		console.log("id not found");
		return response.status(404).send();
	}
	
})

//update dealers

app.post('/updateDealers',function(req,response){
	console.log('update form data',req.body);

	var base64Str = req.body.imageFile;
	var path ='./uploads/';
	var optionalObj = {'fileName': 'img-' + Date.now(), 'type':'jpg'};
	
	var imageInfo = base64ToImage(base64Str,path,optionalObj); 

	var update = {
			dealer_name  :  req.body.dealer_name,
			phone  :  req.body.phone,
			email  :  req.body.email,
			address  :  req.body.address,
			city  :  req.body.city,
			state  :  req.body.state,
			zip_code  :  req.body.zip_code,
			monday_sales_hours  :  req.body.monday_sales_hours,
			tuesday_sales_hours  :  req.body.tuesday_sales_hours,
			wednesday_sales_hours  :  req.body.wednesday_sales_hours,
			thursday_sales_hours  :  req.body.thursday_sales_hours,
			friday_sales_hours  :  req.body.friday_sales_hours,
			saturday_sales_hours  :  req.body.saturday_sales_hours,
			sunday_sales_hours  :  req.body.sunday_sales_hours,
			monday_service_hours  :  req.body.monday_service_hours,
			wednesday_service_hours  :  req.body.wednesday_service_hours,
			thursday_service_hours  :  req.body.thursday_service_hours,
			friday_service_hours  :  req.body.friday_service_hours,
			saturday_service_hours  :  req.body.saturday_service_hours,
			sunday_service_hours  :  req.body.sunday_service_hours,
			monday_parts_hours  :  req.body.monday_parts_hours,
			tuesday_parts_hours  :  req.body.tuesday_parts_hours,
			wednesday_parts_hours  :  req.body.wednesday_parts_hours,
			thursday_parts_hours  :  req.body.thursday_parts_hours,
			friday_parts_hours  :  req.body.friday_parts_hours,
			saturday_parts_hours  :  req.body.saturday_parts_hours,
			sunday_parts_hours  :  req.body.sunday_parts_hours,
			sales_phone  :  req.body.sales_phone,
			dealer_type  :  req.body.dealer_type,
			content_translation  :  req.body.content_translation,
			dealer_id  :  req.body.dealer_id,
			rooftopId  : req.body.rooftopId,
			english_website_url : req.body.english_website_url,
			longitude : req.body.longitude,
			imageInfo: imageInfo,
			imageFile: base64Str,
	}
	if(req.body.id !== "")
	{
		collection.updateOne({"_id":ObjectId(req.body.id)}, {$set: update}, function(err, res) {
			if (err){
				console.log("Something wrong when updating data!");
				return response.send(err);
			}else{
				console.log('dealers data updated');
				return response.status(200).send();
			}
		});
	}
	else
	{
		console.log("id not found");
		return response.status(404).send();
	}	
	
});


app.listen(process.env.PORT, () => {
    MongoClient.connect(CONNECTION_URL, { useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
		collection = database.collection("dealers_information");
		dealersInventory = database.collection("dealers_inventory");
		dealersInventories = database.collection("dealers_inventories");
		paymentPrice = database.collection("payment_price");
		console.log("Connected to `" + DATABASE_NAME + "`!");
		console.log(`Your port is ${process.env.PORT}`);
    });
});