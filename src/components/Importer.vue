<template>
   <!--Rtp-->

    <section class="wow animated fadeInDown header-copy container" data-wow-delay="0.5s">
      <!--Main Navigation-->
      <header>
          <nav class="navbar navbar-expand-lg navbar-light scrolling-navbar">
              <a class="navbar-brand" href="#"><strong>Navbar</strong></a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
              </button>
               <div class="collapse navbar-collapse" id="navbarSupportedContent">
                   <ul class="navbar-nav mr-auto">
                       <li class="nav-item active">
                           <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                       </li>
                       <li class="nav-item">
                           <a class="nav-link" href="#">Features</a>
                       </li>
                       <li class="nav-item">
                           <a class="nav-link" href="#">Pricing</a>
                       </li>
                       <li class="nav-item">
                           <a class="nav-link" href="#">Opinions</a>
                       </li>
                   </ul>
                   <ul class="navbar-nav nav-flex-icons">
                       <li class="nav-item">
                           <a class="nav-link"><i class="fa fa-facebook"></i></a>
                       </li>
                       <li class="nav-item">
                           <a class="nav-link"><i class="fa fa-twitter"></i></a>
                       </li>
                       <li class="nav-item">
                           <a class="nav-link"><i class="fa fa-instagram"></i></a>
                       </li>
                   </ul>
               </div>
           </nav>

       </header>
     <!--Main Navigation-->
      <!-- <h2 class="xs-mb-20">ORDER <strong>LTE-A</strong> TODAY AND <strong>SAVE</strong> ON YOUR <strong>SET-UP</strong></h2> -->
      <div class="row">
        <div class="col-sm-12 py-3">
          <div class="card">
              <h3 class="card-header primary-color white-text">Ignition Bulk DSL Service Import</h3>
              <div class="card-body">
                  <h4 class="card-title">Special title treatment</h4>
                  <textarea type="text" v-model="IGBulkDSLServiceData" id="IGBulkDSLServiceData" class="form-control" rows="5"></textarea>
                  <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  <button type="button" class="btn btn-outline-primary waves-effect" v-on:click="parseIGBulkDSLServiceData()">Parse Data</button>
                  <button type="button" class="btn btn-outline-primary waves-effect" v-on:click="loadIGBulkDSLServiceData()">Load Services</button>
                  <button type="button" class="btn btn-outline-primary waves-effect" v-on:click="loadNeoBulkDSLServiceData()">Load Services into Neology</button>
                  <p class="card-text">
                    <code>
                      {{ parsedIGBulkDSLServiceData | pretty }}
                    </code>
                  </p>
                </div>
          </div>
        </div>
      </div>
    </section>
   <!--End About-->
</template>

<script>
import axios from 'axios'
var _ = require('lodash')
var Papa = require('papaparse')
export default {
  name: 'importer',
  data () {
    return {
      msg: 'Importer Page',
      IGBulkDSLServiceData: '',
      parsedIGBulkDSLServiceData: []
    }
  },
  filters: {
    pretty: function (value) {
      return JSON.stringify(value, null, 2)
    }
  },
  mounted () {
    // this.loadServices()
  },
  methods: {
    loadServices () {
      console.log('Finding Services')
      var self = this
      axios({
        method: 'get',
        url: 'https://ignition.isignite.co.za:1337/services?where={"product":"59676c140eddb81438f2b45c"}',
        headers: {'authorization': 'Basic ZGV2bGluOmFzZGZhc2Rm'}
      }).then(response => {
        $.each(response.data, function (index, service) {
          if (service.lastStatus == null) {
            self.noLastStatusServices.push(service)
          } else {
            self.withLastStatusServices.push(service)
          }
        })
        self.unDeliveredServices = _.filter(self.withLastStatusServices, function (o) { return o.lastStatus.tracking_info.status !== 'Delivered' })
      })
    },
    parseIGBulkDSLServiceData () {
      console.log('Parsing Services Data')
      var self = this
      self.parsedIGBulkDSLServiceData = Papa.parse(self.IGBulkDSLServiceData, {header: true})

      // axios({
      //   method: 'get',
      //   url: 'https://ignition.isignite.co.za:1337/services/' + serviceId + '?forcestatusupdate=true',
      //   headers: {'authorization': 'Basic ZGV2bGluOmFzZGZhc2Rm'}
      // }).then(response => {
      //   console.log(response)
      //   alert('Service Status Refreshed:' + serviceId)
      // })
    },
    loadNeoBulkDSLServiceData () {
      console.log('Loading Services Data into Neology')
      var self = this
      var parsedIGBulkDSLServiceData = self.parsedIGBulkDSLServiceData.data
      _.each(parsedIGBulkDSLServiceData, function (value, key) {
        var res = value.adsl_account_username.split('@')
        var url = 'https://channel.ignite.co.za/napi/v1/import/vauth/add.json' +
                  '?username=' + res[0] +
                  '&sku=' + value.sku_name +
                  '&account_id=' + value.account_id +
                  '&account_billing_id=' + value.account_billing_id +
                  '&override_realm=' + res[1] +
                  '&api_key=gPqHY7etBqRI5BxWb3bAJoTiG1AQfyfi'
        console.log(url)
        axios({
          method: 'get',
          url: url
        }).then(response => {
          console.log(response)
        }).catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request)
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message)
          }
          console.log(error.config)
        })
      })
    },
    loadIGBulkDSLServiceData () {
      console.log('Loading Services Data')
      var self = this
      var parsedIGBulkDSLServiceData = self.parsedIGBulkDSLServiceData.data
      _.each(parsedIGBulkDSLServiceData, function (value, key) {
        axios({
          method: 'post',
          data: {
            'customer': value.customer,
            'product': value.product,
            'externalServiceRef': value.externalServiceRef,
            'parameters': {
              'adsl_account_username': value.adsl_account_username,
              'adsl_account_password': value.adsl_account_password,
              'adsl_account_class_id': value.adsl_account_class_id,
              'adsl_account_comment': value.adsl_account_comment,
              'adsl_account_email_address': value.adsl_account_email_address
            }
          },
          url: 'https://ignition.isignite.co.za:1337/services/',
          headers: {'authorization': 'Basic ZGV2bGluOmFzZGZhc2Rm'}
        }).then(response => {
          console.log(response)
        }).catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request)
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message)
          }
          console.log(error.config)
        })
      })
    }
  }
}
</script>
<!-- http://ignition-staging.isignite.co.za:1337/services?where={"externalServiceRef":{"contains":"409156"},"externalServiceRef":{"endsWith":"lte"}} -->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
