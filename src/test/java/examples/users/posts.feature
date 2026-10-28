Feature: API de Posts

  Background:
    * url 'https://gorest.co.in/public/v2'
    * configure headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer 700d0c7a86eb84028bf5cd204b11587f812f9d7cd880dc4edbdbd1d407ae9954' }
    * def dataGenerator = Java.type('Utils.DataGenerator')
    * def getUserPayload =
      """
      function() {
        return {
          "name": dataGenerator.getRandonName(),
          "gender": "male",
          "email": dataGenerator.getEmailRandom(),
          "status": "active"
        }
      }
      """

  Scenario: ObtenerPost
    # Crear un usuario primero
    * def userPayload = getUserPayload()
    Given path 'users'
    And request userPayload
    When method Post
    Then status 201
    * def usuario_id = response.id

    # Crear un post para este usuario
    Given path 'users', usuario_id, 'posts'
    And request { "title": "Mi primer post", "body": "Este es el cuerpo del post." }
    When method Post
    Then status 201
    * def post_id = response.id

    # Obtener los posts del usuario
    Given path 'users', usuario_id, 'posts'
    When method Get
    Then status 200
    And match response == '#array'
    And match response[0].title == 'Mi primer post'
    And assert responseTime < 5000

  Scenario: AgregarPost
    # Crear un usuario primero
    * def userPayload = getUserPayload()
    Given path 'users'
    And request userPayload
    When method Post
    Then status 201
    * def usuario_id = response.id

    # Agregar un post
    Given path 'users', usuario_id, 'posts'
    And request { "title": "Titulo nuevo", "body": "Contenido interesante" }
    When method Post
    Then status 201
    And match response.id == '#number'
    And match response.user_id == usuario_id
    And match response.title == 'Titulo nuevo'
