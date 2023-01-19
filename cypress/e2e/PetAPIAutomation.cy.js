
describe('PetAPI HTTP Method Automation ',function(){

     //test1 Post method- Add a new pet to the store
     it('POSTAddpet',function(){
        cy.request({
            method : 'POST',
            url : 'https://petstore3.swagger.io/api/v3/pet',
            headers:{
              accept : "application/json"
            },
            body:{
              "id": 1000,
                "name": "Puppy",
                "category": {
                  "id": 1,
                  "name": "Dogs"
                },
                "photoUrls": [
                 "string"
                ],
               "tags": [
                {
                    "id": 0,
                   "name": "string"
                }
               ],
              "status": "pending"
            }
   
        }).then(function(response){
           
          expect(response.status).to.eq(200)
          expect(response.headers).to.have.property('content-type')   
          expect(response.body).to.have.property('category')
          expect(response.body).to.has.property('status')  
          cy.log(JSON.stringify(response.body))
        })
    })
    //test2 Find Pet By status
    it('GETBystatus',function(){
        cy.request({
            method : 'GET',
            url : 'https://petstore3.swagger.io/api/v3/pet/findByStatus',
            qs:{
                "status" : "available"
            }
   
        }).then(function(response){
           console.log(response.url);
          expect(response.status).to.eq(200)
          expect(response.headers).to.have.property('content-type')
          var responseBody = (response.body)      
          expect(responseBody[0].status).to.eq('available')
          cy.log(JSON.stringify(response.body))
        })
    })   
    
    // Find Pet By tags
    it('GETByTags',function(){
      cy.request({
          method : 'GET',
          url : 'https://petstore3.swagger.io/api/v3/pet/findByTags',
          qs:
          {
            "tags": "tag1",
            //"tags": "tag3"
        }
 
      }).then(function(response){
         console.log(response.url);
        expect(response.status).to.eq(200)
        expect(response.headers).to.have.property('content-type')
        var responseBody = (response.body)      
        expect(responseBody[0].tags[0].name).to.eq('tag1')
        cy.log(JSON.stringify(response.body))
      })
  })
   
   ///
   // Find Pet By PetID
   it('GETByPetId',function(){
    let petid = 10
    cy.request({
        method : 'GET',
        url : 'https://petstore3.swagger.io/api/v3/pet/'+ petid +'',
        

    }).then(function(response){
       console.log(response.url);
      expect(response.status).to.eq(200)
      expect(response.headers).to.have.property('content-type')          
      expect(response.body).to.have.property('id')
      cy.log(JSON.stringify(response.body))
    })
})


    //test3
    it('POSTUpdatepetBYID',function(){
        cy.request({
          method : 'POST',
          url : 'https://petstore3.swagger.io/api/v3/pet/1000',
          qs: {
              "name": "Ronny",
              "status": "available"
          }
        }).then(function(response){
          console.log(response.url);
            expect(response.status).to.eq(200)
            expect(response.body.name).to.eq('Ronny')
           expect(response.body.status).to.eq('available')
            cy.log(JSON.stringify(response.body))
        })
        
      })
      //test4
     it('PUT_Update an exiting pet',function(){
          cy.request({
            method : 'PUT',
            url : 'https://petstore3.swagger.io/api/v3/pet',
            body: {
                
                    "id": 10,
                    "name": "doggie",
                    "category": {
                      "id": 1,
                      "name": "Dogs"
                    },
                    "photoUrls": [
                      "string"
                    ],
                    "tags": [
                      {
                        "id": 0,
                        "name": "string"
                      }
                    ],
                    "status": "available"
                  
            }
          }).then(function(response){
            console.log(response.url);
             expect(response.status).to.eq(200)
             expect(response.body).to.have.property('status')
             expect(response.body).to.have.property('category')
          })
     })
     //test5
     it('DELETEPet',function(){
        let petid = 11
       cy.request({
            method : 'DELETE',
            url : 'https://petstore3.swagger.io/api/v3/pet/' + petid +''
       }).then(function(response){
          expect(response.status).to.eq(200)
          expect(response.body).to.have.string('Pet deleted')
       })
    })
})