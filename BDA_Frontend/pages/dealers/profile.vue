<template>
  <div>
    <nuxt />
    <v-row v-if="roles==1">
        <DealerDashboardTabs />
      </v-row>
      <v-row v-else>
        <UsersDashboardTabs />
      </v-row>
      <!-- admin profile -->

      <div class="container" v-if="roles==1" style="margin-left: 400px;
    margin-top: 50px;">
    <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-6">
            <div class="well well-sm">
                <div class="row">
                    <div class="col-sm-6 col-md-4">
                        <img src="http://images.clipartpanda.com/user-clipart-matt-icons_preferences-desktop-personal.png" alt="" class="img-rounded img-responsive" />
                    </div>
                    <div class="col-sm-6 col-md-8">
                        <h4>{{dealer_name}}</h4>
                        <!-- <small><cite title="San Francisco, USA">San Francisco, USA <i class="glyphicon glyphicon-map-marker">
                        </i></cite></small> -->
                        <p>
                            <i class="glyphicon glyphicon-envelope"></i>{{email}}
                            <br />
                            <i class="glyphicon glyphicon-phone"></i>{{phone}}
                            </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        <!-- dealer profile  -->
        <div class="container emp-profile" v-else style="margin-left: 240px;
    margin-top: 50px;">
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-img">
                            <img :src="image" alt="" width="50" height="50"/>
                        </div>
                        <h3 style="text-align:center;">{{dealer_name}}</h3>
                    </div>
                    <div class="col-md-8">
                        <div class="tab-content profile-tab" id="myTabContent">
                            <div id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Dealer Name</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{dealer_name}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{email}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Phone</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{phone}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Address</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{address}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>City</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{city}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>State</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{state}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Zip Code</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{zip_code}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>monday_sales_hours</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{monday_sales_hours}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>tuesday_sales_hours</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{tuesday_sales_hours}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>wednesday_sales_hours</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{wednesday_sales_hours}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>thursday_sales_hours</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{thursday_sales_hours}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>friday_sales_hours</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{friday_sales_hours}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>saturday_sales_hours</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{saturday_sales_hours}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>sunday_sales_hours</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{sunday_sales_hours}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>monday_service_hours</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{monday_service_hours}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>wednesday_service_hours</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{wednesday_service_hours}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>thursday_service_hours  </label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{thursday_service_hours}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>friday_service_hours</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{friday_service_hours}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>saturday_service_hours</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{saturday_service_hours}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>sunday_service_hours</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{sunday_service_hours}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>monday_parts_hours</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{monday_parts_hours}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>tuesday_parts_hours</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{tuesday_parts_hours}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>wednesday_parts_hours</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{wednesday_parts_hours}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>thursday_parts_hours</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{thursday_parts_hours}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>friday_parts_hours</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{friday_parts_hours}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>saturday_parts_hours</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{saturday_parts_hours}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>sunday_parts_hours</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{sunday_parts_hours}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>sales_phone</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{sales_phone}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>dealer_type</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{dealer_type}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>content_translation</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{content_translation}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>dealer_id</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{dealer_id}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>rooftopId</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{rooftopId}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>english_website_url</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{english_website_url}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>longitude</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{{longitude}}</p>
                                            </div>
                                        </div>
                            </div>
                        </div>
                    </div>
                    <!-- {{userid}} -->
                    <!-- <nuxt-link to="/dealers/dealers_edit" no-prefetch>Edit Profile</nuxt-link> -->
                    <!-- <div class="col-md-1"><a href="/dealers/dealers_edit?id=">Edit</a></div> -->
                </div>        
        </div>

  </div>
</template>

<script>
import axios from 'axios';
  export default {
    layout: 'adminpage',
    name: 'profile',
    components: {
            DealerDashboardTabs: () => import('@/components/dashboard/DealerDashboardTabs'),
            UsersDashboardTabs: () => import('@/components/dashboard/UsersDashboardTabs')
        },
        data(){
          return{
                roles:"",
                userid:"",
                dealer_name  :  "",
                phone  :  "",
                email  :  "",
                address  :  "",
                city  :  "",
                state  :  "",
                zip_code  :  "",
                monday_sales_hours  :  "",
                tuesday_sales_hours  :  "",
                wednesday_sales_hours  :  "",
                thursday_sales_hours  :  "",
                friday_sales_hours  :  "",
                saturday_sales_hours  :  "",
                sunday_sales_hours  :  "",
                monday_service_hours  :  "",
                wednesday_service_hours  :  "",
                thursday_service_hours  :  "",
                friday_service_hours  :  "",
                saturday_service_hours  :  "",
                sunday_service_hours  :  "",
                monday_parts_hours  :  "",
                tuesday_parts_hours  :  "",
                wednesday_parts_hours  :  "",
                thursday_parts_hours  :  "",
                friday_parts_hours  :  "",
                saturday_parts_hours  :  "",
                sunday_parts_hours  :  "",
                sales_phone  :  "",
                dealer_type  :  "",
                content_translation  :  "",
                dealer_id  :  "",
                rooftopId  : "",
                english_website_url : "",
                longitude : "",
                image:"",
          }
        },
        mounted(){
            var isUserLogin = localStorage.hasOwnProperty('user');
            console.log('dealernames',isUserLogin);
            if(isUserLogin == false){
                window.location.href = '../Inicio de sesión del distribuidor';
            }

            var userdata = localStorage.getItem('user');
            console.log('datasssssssssssss', userdata);
            this.userid = JSON.parse(userdata)[0]._id; 
            this.roles = JSON.parse(userdata)[0].roles;
            console.log('roles profile', this.roles);
            axios.post(`${process.env.BACKEND_API}/getDealersDataById`, {
            id: this.userid,
            })
            .then(res => {
            this.image = res.data[0].imageFile;
            this.dealer_name =  res.data[0].dealer_name;
            this.phone = res.data[0].phone;
            this.email= res.data[0].email;
            this.address = res.data[0].address;
            this.city = res.data[0].city; 
            this.state = res.data[0].state;
            this.zip_code = res.data[0].zip_code;
            this.monday_sales_hours = res.data[0].monday_sales_hours;
            this.tuesday_sales_hours = res.data[0].tuesday_sales_hours;
            this.wednesday_sales_hours = res.data[0].wednesday_sales_hours;
            this.thursday_sales_hours = res.data[0].thursday_sales_hours;
            this.friday_sales_hours = res.data[0].friday_sales_hours;
            this.saturday_sales_hours = res.data[0].saturday_sales_hours;
            this.sunday_sales_hours = res.data[0].sunday_sales_hours;
            this.monday_service_hours = res.data[0].monday_service_hours;
            this.wednesday_service_hours = res.data[0].wednesday_service_hours;
            this.thursday_service_hours = res.data[0].thursday_service_hours;
            this.friday_service_hours = res.data[0].friday_service_hours;
            this.saturday_service_hours = res.data[0].saturday_service_hours;
            this.sunday_service_hours = res.data[0].sunday_service_hours;
            this.monday_parts_hours = res.data[0].monday_parts_hours;
            this.tuesday_parts_hours = res.data[0].tuesday_parts_hours;
            this.wednesday_parts_hours = res.data[0].wednesday_parts_hours;
            this.thursday_parts_hours = res.data[0].thursday_parts_hours;
            this.friday_parts_hours = res.data[0].friday_parts_hours;
            this.saturday_parts_hours = res.data[0].saturday_parts_hours;
            this.sunday_parts_hours = res.data[0].sunday_parts_hours;
            this.sales_phone = res.data[0].sales_phone;
            this.dealer_type = res.data[0].dealer_type;
            this.content_translation = res.data[0].content_translation;
            this.dealer_id = res.data[0].dealer_id;
            this.rooftopId = res.data[0].rooftopId;
            this.english_website_url = res.data[0].english_website_url;
            this.longitude = res.data[0].longitude;      
            })
            .catch(e => {
                console.error(e);
            })
            
        }
  }
</script>

<style>
.emp-profile{
    padding: 3%;
    margin-top: 3%;
    margin-bottom: 3%;
    border-radius: 0.5rem;
    background: #fff;
}
.profile-img{
    text-align: center;
}
.profile-img img{
    width: 70%;
    height: 100%;
}
.profile-img .file {
    position: relative;
    overflow: hidden;
    margin-top: -20%;
    width: 70%;
    border: none;
    border-radius: 0;
    font-size: 15px;
    background: #212529b8;
}
.profile-img .file input {
    position: absolute;
    opacity: 0;
    right: 0;
    top: 0;
}
.profile-head h5{
    color: #333;
}
.profile-head h6{
    color: #0062cc;
}
.profile-edit-btn{
    border: none;
    border-radius: 1.5rem;
    width: 70%;
    padding: 2%;
    font-weight: 600;
    color: #6c757d;
    cursor: pointer;
}
.proile-rating{
    font-size: 12px;
    color: #818182;
    margin-top: 5%;
}
.proile-rating span{
    color: #495057;
    font-size: 15px;
    font-weight: 600;
}
.profile-head .nav-tabs{
    margin-bottom:5%;
}
.profile-head .nav-tabs .nav-link{
    font-weight:600;
    border: none;
}
.profile-head .nav-tabs .nav-link.active{
    border: none;
    border-bottom:2px solid #0062cc;
}
.profile-work{
    padding: 14%;
    margin-top: -15%;
}
.profile-work p{
    font-size: 12px;
    color: #818182;
    font-weight: 600;
    margin-top: 10%;
}
.profile-work a{
    text-decoration: none;
    color: #495057;
    font-weight: 600;
    font-size: 14px;
}
.profile-work ul{
    list-style: none;
}
.profile-tab label{
    font-weight: 600;
}
.profile-tab p{
    font-weight: 600;
    color: #0062cc;
}
</style>
