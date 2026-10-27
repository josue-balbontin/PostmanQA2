Feature: API de Comments

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

  Scenario: ObtenerComentario
    # Crear un usuario primero
    * def userPayload = getUserPayload()
    Given path 'users'
    And request userPayload
    When method Post
    Then status 201
    * def usuario_id = response.id

    # Crear un post para este usuario
    Given path 'users', usuario_id, 'posts'
    And request { "title": "Post para comentar", "body": "Este post tendra comentarios." }
    When method Post
    Then status 201
    * def post_id = response.id

    # Agregar un comentario al post
    Given path 'posts', post_id, 'comments'
    And request { "name": "Comentador", "email": "comentador@test.com", "body": "Muy buen post!" }
    When method Post
    Then status 201

    # Obtener los comentarios del post
    Given path 'posts', post_id, 'comments'
    When method Get
    Then status 200
    And match response == '#array'
    And match response[0].body == 'Muy buen post!'
    And assert responseTime < 5000

  Scenario: AgregarComment
    # Crear un usuario
    * def userPayload = getUserPayload()
    Given path 'users'
    And request userPayload
    When method Post
    Then status 201
    * def usuario_id = response.id

    # Crear un post
    Given path 'users', usuario_id, 'posts'
    And request { "title": "Otro post", "body": "Cuerpo del otro post." }
    When method Post
    Then status 201
    * def post_id = response.id

    # Agregar comentario
    Given path 'posts', post_id, 'comments'
    And request { "name": "Josue", "email": "josue@test.com", "body": "This is a test comment" }
    When method Post
    Then status 201
    And match response.id == '#number'
    And match response.post_id == post_id
    And match response.name == 'Josue'
