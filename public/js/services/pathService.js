async function applyPaths(){
    const response = await axios.post('/api/paths/apply')

    if(response.error){
        return console.error(response.error)
    }

    if( response.status == 200){
        document.getElementById('statusContainer').innerHTML = '<div class="text-green-600 font-bold"> ◉ Status: Online</div>'
    }

}

async function disablePaths(){

    const response = await axios.post('/api/paths/disable')

    if(response.error){
        return console.error(response.error)
    }

    if( response.status == 200){
        document.getElementById('statusContainer').innerHTML = '<div class="text-red-600 font-bold"> ◉ Status: Offline</div>'
    }

}

async function deletePath(id){

    const response = await axios.delete(`/api/paths/${id}`)

    if(response.error){
        return console.error(response.error)
    }

    location.reload()

    console.log(response)
}