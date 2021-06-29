const deparment = {
    template: `
    <div>
        <button type="button" class="btn btn-primary m-2 fload-end"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        @click="addClick()">
        Agregar Departamento
        </button>
        <table class="table table-striped table-hover table-bordered">
            <thead>
                <tr>
                    <th>
                        <div class="d-flex flex-row">
                        <input class="form-control m-2"
                            v-model="DeparmentIdFilter"
                            v-on:keyup="FilterFn()"
                            placeholder="Filtrar...">

                            <button type="button" class="btn btn-light"
                            @click="sortResult('DeparmentId',true)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                                </svg>                            
                            </button>
                            <button type="button" class="btn btn-light"
                            @click="sortResult('DeparmentId',false)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                                </svg>
                            </button>
                        </div>
                        Id Departamento
                    </th>
                    <th>
                        <div class="d-flex flex-row">
                        <input class="form-control m-2"
                            v-model="DeparmentNameFilter"
                            v-on:keyup="FilterFn()"
                            placeholder="Filtrar...">

                            <button type="button" class="btn btn-light"
                            @click="sortResult('DeparmentName',true)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                                </svg>                            
                            </button>
                            <button type="button" class="btn btn-light"
                            @click="sortResult('DeparmentName',false)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                                </svg>
                            </button>
                        </div>
                        Nombre Departamento
                    </th> 
                    <th>
                        Opciones
                    </th>  
                    </tr>
            </thead>
            <tbody>
                <tr>
                    <tr v-for="dep in deparments">
                        <td>{{dep.DeparmentId}}</td>
                        <td>{{dep.DeparmentName}}</td>
                        <td>
                            <button type="button" class="btn btn-light mr-1"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            @click="editClick(dep)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>
                            </button>
                            <button type="button" @click="deleteClick(dep.DeparmentId)" class="btn btn-light mr-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                </svg>
                            </button>
                        </td>
                </tr>
            </tbody>
        </table>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" 
        aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <span class="input-group-text">Nombre Departamento</span>
                            <input type="text" class="form-control" v-model="DeparmentName">
                        </div>
                        <button type="button" @click="createClick()"
                        v-if="DeparmentId==0" class="btn btn-primary">
                        Crear
                        </button>
                        <button type="button" @click="updateClick()"
                        v-if="DeparmentId!=0" class="btn btn-primary">
                        Actualizar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            deparments: [],
            modalTitle: "",
            DeparmentId: 0,
            DeparmentName: "",
            DeparmentIdFilter:"",
            DeparmentNameFilter:"",
            deparmentsWithoutFilter:[]
        }
    },
    methods: {
        refreshData() {
            axios.get(variables.API_URL + "deparment")
                .then((response) => {
                    this.deparments = response.data;
                    this.deparmentsWithoutFilter = response.data;
                });
        },
        addClick() {
            this.modalTitle = "Agregar Departamento";
            this.DeparmentId = 0;
            this.DeparmentName = "";
        },
        editClick(dep) {
            this.modalTitle = "Editar Departamento";
            this.DeparmentId = dep.DeparmentId;
            this.DeparmentName = dep.DeparmentName;
        },
        createClick() {
            axios.post(variables.API_URL + "deparment", {
                DeparmentName: this.DeparmentName
            })
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                });
        },
        updateClick() {
            axios.put(variables.API_URL + "deparment", {
                DeparmentId: this.DeparmentId,
                DeparmentName: this.DeparmentName
            })
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                });
        },
        deleteClick(id) {
            if (!confirm("¿Está seguro de querer eliminar el registro?")) {
                return;
            }

            axios.delete(variables.API_URL + "deparment/" + id)
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                });
        },
        FilterFn(){
            var DeparmentIdFilter = this.DeparmentIdFilter;
            var DeparmentNameFilter = this.DeparmentNameFilter;

            this.deparments=this.deparmentsWithoutFilter.filter(
                function(el){
                    return el.DeparmentId.toString().toLowerCase().includes(
                        DeparmentIdFilter.toString().trim().toLowerCase()
                    )&&
                    el.DeparmentName.toString().toLowerCase().includes(
                        DeparmentNameFilter.toString().trim().toLowerCase()
                    )
                });
        },
        sortResult(prop,asc){
            this.deparments=this.deparmentsWithoutFilter.sort(function(a,b){
                if(asc){
                    return (a[prop]>b[prop])?1:(a[prop]<b[prop]?-1:0);
                }
                else {
                    return (b[prop]>a[prop])?1:(b[prop]<a[prop]?-1:0);
                }
            })
        }
    },
    mounted: function () {
        this.refreshData();
    }
}
