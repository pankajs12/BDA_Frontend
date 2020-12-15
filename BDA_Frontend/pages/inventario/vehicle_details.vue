<template>
<div>
    <nuxt />
  <DealerDashboardTabs />
    <div class="content-wrapper" style="margin-left: 240px;
        margin-top: 100px;">
        <h3 style="text-align:center;">Vehicle Details</h3>
        <div class="container" style="margin-left: 150px;">   
        <div class="row">
            <div class="col-lg-12">
                <div class="card mb-4 bg-dark text-white">
                    <img class="card-img" src="https://dl.airtable.com/.attachmentThumbnails/80d275202738a126f5cb915ad78169e0/3ddf1102" alt="Card image">
                    <div class="card-img-overlay">
                    <h5>{{dealername}}</h5>
                    </div>
                </div>
            </div>

            <div class="col-md-6" style="font-style: italic; font-size: initial;">
                <span style="color:green;">Body :-----</span><br />
                Door Count : {{doorCount}} <br />
                Truck Bed Length : {{truckBedLength}} <br />
                Truck Cab Type : {{truckCabType}} <br />
                Wheel Base : {{wheelBase}} <br />
                <span style="color:green;">Car Fax Data :-----</span><br/>
                Carfax Vehicle History Report Url : {{carfaxVehicleHistoryReportUrl}} <br />
                Date Modified : {{dateModified}} <br />
                Is One Owner : {{isOneOwner}} <br />
                Listing Expiration Date : {{listingExpirationDate}} <br />
                <span style="color:green">Certification :-----</span><br />
                Dealer Certified : {{dealerCertified}} <br />
                Oem Certified Checklist Number : {{oemCertifiedChecklistNumber}} <br />
                Manufacturer Certified : {{manufacturerCertified}}  <br /> 
                <span style="color:green;">Chrome Style Data :-----</span><br/>
                Chrome Style List : {{chromeStyleList}} <br />
                Chrome Style Match Count : {{chromeStyleMatchCount}} <br />
                Style Description : {{styleDescription}} <br />
                <span style="color:green">Decode Data :-----</span><br/>
                Dealer Options : {{dealerOptions}} <br />
                Factory Codes : {{factoryCodes}} <br />
                Factory Descriptions : {{factoryDescriptions}} <br />
                Package Codes : {{packageCodes}} <br />
                Package Descriptions : {{packageDescriptions}} <br />
                <span style="color:green;">Engine :-----</span><br/>
                Aspiration Type : {{aspirationType}} <br />
                Block Type : {{blockType}} <br />
                Cylinders : {{cylinders}} <br />
                Description : {{description}} <br />
                Displacement : {{displacement}} <br />
                Displacement CubicInches : {{displacementCubicInches}} <br />
                Horsepower : {{horsepower}} <br />
            </div>
            <div class="col-md-6" style="font-style: italic; font-size: initial;">
                <span style="color:green;">Evox Data :-----</span><br/>
                Evox ColorizedFile1 : {{evoxColorizedFile1}} <br />
                Evox ColorizedFile2 : {{evoxColorizedFile2}} <br />
                Evox ColorizedFile3 : {{evoxColorizedFile3}} <br />
                Evox SendId : {{evoxSendId}} <br />
                Evox Vifid : {{evoxVifid}} <br />
                <span style="color:green;">Financial Data :-----</span><br/>
                Ad Pack : {{adPack}} <br />
                Added Equipment Pricing : {{addedEquipmentPricing}} <br />
                Base MSRP : {{baseMSRP}} <br />
                Cost : {{cost}} <br />
                Base Invoice : {{baseInvoice}}  <br />
                CustomPrice1 : {{customPrice1}} <br />
                CustomPrice2 : {{customPrice2}} <br />
                CustomPrice3 : {{customPrice3}} <br />
                <span style="color:green">Visual Details :-----</span><br/>
                Description : {{description}} <br />
                Generic Color : {{genericColor}} <br />
                <span style="color:green;">VehicleId :-----</span><br/>
                Vin : {{vin}} <br />
                DealerId : {{dealerId}} <br />
                Make : {{make}} <br />
                <span style="color:green;">Fuel Data :-----</span><br/>
                CityLitersPer100Km : {{cityLitersPer100Km}} <br />
                CityMilesPerGallon : {{cityMilesPerGallon}} <br />
                Epa Combined : {{epaCombined}} <br />
                HighwayLitersPer100Km : {{highwayLitersPer100Km}} <br />
                HighwayMilesPerGallon : {{highwayMilesPerGallon}} <br />
                Type : {{type}} <br />
                Miles : {{miles}} <br />
                Model : {{model}} <br />
                Model Number : {{modelNumber}} <br />
                Model Series : {{modelSeries}} <br />
            </div>        
        </div>
    </div>
    </div>
</div>  
</template>

<script>
import axios from 'axios';
export default {
    layout: 'adminpage',
    components: {
            DealerDashboardTabs: () => import('@/components/dashboard/DealerDashboardTabs'),
        },
        data(){
            return {
                vinId: "",
                addedEquipment : "",
                autoDataCodeList : "",
                doorCount : "",
                truckBedLength : "",
                truckCabType : "",
                wheelBase : "",
                carfaxVehicleHistoryReportUrl : "",
                dateModified : "",
                isOneOwner : "",
                listingExpirationDate : "",
                dealerCertified : "",
                oemCertifiedChecklistNumber : "",
                manufacturerCertificationNumber : "",
                manufacturerCertified : "",
                chromeStyleList : "",
                chromeStyleMatchCount : "",
                styleDescription : "",
                dealerOptions : "",
                factoryCodes : "",
                factoryDescriptions : "",
                packageCodes : "",
                packageDescriptions : "",
                description : "",
                aspirationType:"",
                blockType : "",
                cylinders : "",
                description : "",
                displacement : "",
                displacementCubicInches : "",
                horsepower : "",
                evoxColorizedFile1 : "",
                evoxColorizedFile2 : "",
                evoxColorizedFile3 : "",
                evoxSendId : "",
                evoxVifid : "",
                adPack : "",
                addedEquipmentPricing : "",
                baseMSRP : "",
                cost : "",
                baseInvoice : "",
                customPrice1 : "",
                customPrice2 : "",
                customPrice3 : "",
                description : "",
                genericColor : "",
                vin : "",
                dealerId : "",
                make : "",
                cityLitersPer100Km : "",
                cityMilesPerGallon : "",
                epaCombined : "",
                highwayLitersPer100Km : "",
                highwayMilesPerGallon : "",
                type : "",
                miles : "",
                model : "",
                modelNumber : "",
                modelSeries : "",
                dealername:"",
            }
        },
       mounted(){
          this.vinId = this.$route.query.id;
          console.log('vin id',this.vinId);
            axios.post(`${process.env.BACKEND_API}/getAllDealersHomenetInventoryById`, {
            vinId: this.vinId,
            })
            .then(res => {
                console.log('homenet inventory by id', res.data);
                this.addedEquipment = res.data[0].vehicle.addedEquipment;
                this.autoDataCodeList = res.data[0].vehicle.autoDataCodeList;
                //body
                this.doorCount = res.data[0].vehicle.body.doorCount;
                this.truckBedLength = res.data[0].vehicle.body.truckBedLength;
                this.truckCabType = res.data[0].vehicle.body.truckCabType;
                this.wheelBase = res.data[0].vehicle.body.wheelBase;
                //car fax data
                this.carfaxVehicleHistoryReportUrl = res.data[0].vehicle.carfaxData.carfaxVehicleHistoryReportUrl;
                this.dateModified = res.data[0].vehicle.carfaxData.dateModified;
                this.isOneOwner = res.data[0].vehicle.carfaxData.isOneOwner;
                this.listingExpirationDate = res.data[0].vehicle.carfaxData.listingExpirationDate;
                //certification
                this.dealerCertified = res.data[0].vehicle.certification.dealerCertified;
                this.oemCertifiedChecklistNumber = res.data[0].vehicle.certification.oemCertifiedChecklistNumber;
                this.manufacturerCertificationNumber = res.data[0].vehicle.certification.manufacturerCertificationNumber;
                this.manufacturerCertified = res.data[0].vehicle.certification.manufacturerCertified;
                //chrome style data
                this.chromeStyleList = res.data[0].vehicle.chromeStyleData.chromeStyleList;
                this.chromeStyleMatchCount = res.data[0].vehicle.chromeStyleData.chromeStyleMatchCount;
                this.styleDescription = res.data[0].vehicle.chromeStyleData.styleDescription;
                //decodeData
                this.dealerOptions = res.data[0].vehicle.decodeData.dealerOptions;
                this.factoryCodes = res.data[0].vehicle.decodeData.factoryCodes;
                this.factoryDescriptions = res.data[0].vehicle.decodeData.factoryDescriptions;
                // this.options = res.data[0].vehicle.decodeData.options;
                this.packageCodes = res.data[0].vehicle.decodeData.packageCodes;
                this.packageDescriptions = res.data[0].vehicle.decodeData.packageDescriptions;
                //engine  
                this.aspirationType = res.data[0].vehicle.engine.aspirationType;
                this.blockType = res.data[0].vehicle.engine.blockType;
                this.cylinders = res.data[0].vehicle.engine.cylinders;
                this.description = res.data[0].vehicle.engine.description;
                this.displacement = res.data[0].vehicle.engine.displacement;
                this.displacementCubicInches = res.data[0].vehicle.engine.displacementCubicInches;
                this.horsepower = res.data[0].vehicle.engine.horsepower;
                //evoxData
                this.evoxColorizedFile1 = res.data[0].vehicle.evoxData.evoxColorizedFile1;
                this.evoxColorizedFile2 = res.data[0].vehicle.evoxData.evoxColorizedFile2;
                this.evoxColorizedFile3 = res.data[0].vehicle.evoxData.evoxColorizedFile3;
                this.evoxSendId = res.data[0].vehicle.evoxData.evoxSendId;
                this.evoxVifid = res.data[0].vehicle.evoxData.evoxVifid;
                //financialData
                this.adPack = res.data[0].vehicle.financialData.adPack;
                this.addedEquipmentPricing = res.data[0].vehicle.financialData.addedEquipmentPricing;
                this.baseMSRP = res.data[0].vehicle.financialData.baseMSRP;
                this.cost = res.data[0].vehicle.financialData.cost;
                this.baseInvoice = res.data[0].vehicle.financialData.baseInvoice;
                this.customPrice1 = res.data[0].vehicle.financialData.customPrice1;
                this.customPrice2 = res.data[0].vehicle.financialData.customPrice2;
                this.customPrice3 = res.data[0].vehicle.financialData.customPrice3;
                // visualDetails exteriorColor
                this.description = res.data[0].vehicle.visualDetails.exteriorColor.description;
                this.genericColor = res.data[0].vehicle.visualDetails.exteriorColor.genericColor;
                // vehicleId
                this.vin = res.data[0].vehicle.vehicleId.vin;
                this.dealerId = res.data[0].vehicle.vehicleId.dealerId;
                this.make = res.data[0].vehicle.make;
                //fuelData
                this.cityLitersPer100Km = res.data[0].vehicle.fuelData.cityLitersPer100Km;
                this.cityMilesPerGallon = res.data[0].vehicle.fuelData.cityMilesPerGallon;
                this.epaCombined = res.data[0].vehicle.fuelData.epaCombined;
                this.highwayLitersPer100Km = res.data[0].vehicle.fuelData.highwayLitersPer100Km;
                this.highwayMilesPerGallon = res.data[0].vehicle.fuelData.highwayMilesPerGallon;
                this.type = res.data[0].vehicle.fuelData.type;
                this.miles = res.data[0].vehicle.fuelData.miles;
                this.model = res.data[0].vehicle.fuelData.model;
                this.modelNumber = res.data[0].vehicle.fuelData.modelNumber;
                this.modelSeries = res.data[0].vehicle.fuelData.modelSeries;
                this.dealername = res.data[0].vehicle.metadata.dealershipInfo.name

            })
            .catch(e => {
                console.error(e);
            }) 

       }
}
</script>

<style>
/* Container holding the image and the text */
.container {
  position: relative;
}

/* Bottom right text */
.card-img-overlay {
    position: absolute;
    bottom: 50px;
    right: 630px;
    background-color: whitesmoke;
    color: #0e0e0e;
    padding-left: 20px;
    padding-right: 20px;
}
</style>