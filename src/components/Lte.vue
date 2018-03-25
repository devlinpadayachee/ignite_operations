<template>
   <!--Rtp-->
   <section class="wow animated fadeInDown" data-wow-delay="0.5s">
      <!-- <h2 class="xs-mb-20">ORDER <strong>LTE-A</strong> TODAY AND <strong>SAVE</strong> ON YOUR <strong>SET-UP</strong></h2> -->
      <download-excel
          class   = "btn btn-default"
          :data   = 'printArr'
          :fields = 'jsonFields'
          :meta   = 'jsonMeta'
          name    = 'filename.xls'>

          Download Excel (you can customize this with html code!)

      </download-excel>
      <div class="row">
        <!-- <div class="alert alert-warning">
          Services with no status data
        </div> -->

        <div v-for="(service,index) in noLastStatusServices" class="col-sm-3">
          <div class="card my-1" style="border-left:10px solid; border-color:#f1c40f;">
            <div class="card-header">
              <img class="mr-3 z-depth-3 float-left" style="width: 3rem; border-radius :100px" src="../assets/img/LTE-A-colour.svg" alt="LTE-A">
              <span><h5 class="mt-1">{{ service.externalServiceRef }}</h5></span>
            </div>
              <div class="row">
                  <div class="col-sm-12">
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item small ">Username: {{ service.parameters.username }}</li>
                      <li class="list-group-item small ">Password: {{ service.parameters.password }}</li>
                      <li class="list-group-item small ">LTE Package: {{ service.parameters.class_id }}</li>
                    </ul>
                  </div>
            </div>
            <div class="card-block">
              <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                <div class="btn-group mr-2" role="group" aria-label="First group">
                  <button type="button" class="btn btn-outline-primary btn-sm waves-effect" v-on:click="refreshlastStatus(service.id)"><i class="fa fa-refresh" aria-hidden="true"></i></button>
                  <button type="button" class="btn btn-outline-primary btn-sm waves-effect" ><i class="fa fa-slack" aria-hidden="true"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <!-- <div class="alert alert-danger">
          Services which have not been delivered to customers
        </div> -->
        <div v-for="(service,index) in unDeliveredServices" class="col-sm-3" >
              <div style="z-index:10;background-color:#e74c3c; position:absolute;left:0;height:100%">
                </div>
              <div class="card my-1" style="border-left:10px solid; border-color:#e74c3c; ">
                  <div class="card-header">
                    <img class="mr-3 z-depth-3 float-left" style="width: 3rem; border-radius :100px" src="../assets/img/LTE-A-colour.svg" alt="LTE-A">
                    <span><h5 class="mt-1">{{ service.externalServiceRef }}</h5></span>
                  </div>
                  <div class="row">
                      <div class="col-sm-12">
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item small ">Username: {{ service.parameters.username }}</li>
                          <li class="list-group-item small ">Password: {{ service.parameters.password }}</li>
                          <li class="list-group-item small ">LTE Package: {{ service.parameters.class_id }}</li>
                          <li class="list-group-item small ">LTE Package: {{ service.lastStatus.tracking_info.status }}</li>
                        </ul>
                      </div>
                  </div>
                  <div class="card-block">
                    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                      <div class="btn-group mr-2" role="group" aria-label="First group">
                        <button type="button" class="btn btn-outline-primary btn-sm waves-effect" v-on:click="refreshlastStatus(service.id)"><i class="fa fa-refresh" aria-hidden="true"></i></button>
                        <button type="button" class="btn btn-outline-primary btn-sm waves-effect" ><i class="fa fa-slack" aria-hidden="true"></i></button>
                      </div>
                    </div>
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
export default {
  name: 'lte',
  data () {
    return {
      msg: 'Lte Page',
      noLastStatusServices: [],
      withLastStatusServices: [],
      unDeliveredServices: [],
      printArr: [],
      // jsonFields: {
      //   'createdAt': 'String',
      //   'neologyId': 'String',
      //   'status': 'String',
      //   'router': 'String'
      // },
      jsonMeta: [
        [{
          key: 'charset',
          value: 'utf-8'
        }]
      ]
    }
  },
  mounted () {
    this.loadServices()
    this.updateAllServices()
  },
  methods: {
    saveFile: function () {
      const data = JSON.stringify(this.withLastStatusServices)
      const blob = new Blob([data], {type: 'text/plain'})
      const e = document.createEvent('MouseEvents')
      const a = document.createElement('a')
      a.download = 'test.json'
      a.href = window.URL.createObjectURL(blob)
      a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
      e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
      a.dispatchEvent(e)
    },
    updateAllServices () {
      var self = this
      console.log('Updating Services')
      axios({
        method: 'get',
        url: 'https://ignition.isignite.co.za:1337/services?where={"product":"59676c140eddb81438f2b45c"}',
        headers: {'authorization': 'Basic ZGV2bGluOmFzZGZhc2Rm'}
      }).then(response => {
        console.log(response.data.length)
        $.each(response.data, function (index, service) {
          if (service.prov_status === 'completed' && service.lastStatus == null) {
            self.refreshlastStatus(service.id)
          }
        })
      })
      console.log('done')
    },
    loadServices () {
      console.log('Finding Services')
      var self = this
      axios({
        method: 'get',
        url: 'https://ignition.isignite.co.za:1337/services?where={"product":"59676c140eddb81438f2b45c"}',
        headers: {'authorization': 'Basic ZGV2bGluOmFzZGZhc2Rm'}
      }).then(response => {
        console.log(response.data.length)
        $.each(response.data, function (index, service) {
          if (service.lastStatus == null) {
            self.noLastStatusServices.push(service)
          } else {
            var servicearr = service.externalServiceRef.split('-')
            console.log(service.createdAt + ',' + servicearr[2] + ',' + service.id + ',' + service.lastStatus.tracking_info.status + ',' + service.lastStatus.tracking_info.device_type + ',' + service.metadata.lte_router)
            self.printArr.push({createdAt: service.createdAt, neologyId: servicearr[2], status: service.lastStatus.tracking_info.status, router: service.metadata.lte_router})
            self.withLastStatusServices.push(service)
          }
        })
        self.unDeliveredServices = _.filter(self.withLastStatusServices, function (o) { return o.lastStatus.tracking_info.status !== 'Delivered' })
      })
    },
    refreshlastStatus (serviceId) {
      axios({
        method: 'get',
        url: 'https://ignition.isignite.co.za:1337/services/' + serviceId + '?forcestatusupdate=true',
        headers: {'authorization': 'Basic ZGV2bGluOmFzZGZhc2Rm'}
      }).then(response => {
        console.log(response)
        console.log('Service Status Refreshed:' + serviceId)
      })
    }
  }
}
</script>
<!-- http://ignition-staging.isignite.co.za:1337/services?where={"externalServiceRef":{"contains":"409156"},"externalServiceRef":{"endsWith":"lte"}} -->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
