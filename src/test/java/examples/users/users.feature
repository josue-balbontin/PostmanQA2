Feature: API de Usuarios

  Background:
    * url 'https://gorest.co.in/public/v2'
    * configure headers = { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: 'Bearer 700d0c7a86eb84028bf5cd204b11587f812f9d7cd880dc4edbdbd1d407ae9954' }
    * def dataGenerator = Java.type('Utils.DataGenerator')
    * def getPayload =
      """
      function() {
        var emailFake = dataGenerator.getEmailRandom();
        var nameFake = dataGenerator.getRandonName();
        return {
          "name": nameFake,
          "gender": "male",
          "email": emailFake,
          "status": "active"
        }
      }
      """

  @Smock
  Scenario: ObtenerUsuarios
    Given path 'users'
    When method Get
    Then status 200
    And match response == '#array'
    And assert responseTime < 5000

  Scenario: CrearUsuario
    * def payload = getPayload()
    Given path 'users'
    And request payload
    When method Post
    Then status 201
    And match response.id == '#number'
    And match response.name == payload.name
    And match response.email == payload.email

  Scenario: ObtenerUsuario
    * def payload = getPayload()
    # Crear primero para obtenerlo
    Given path 'users'
    And request payload
    When method Post
    Then status 201
    * def usuario_id = response.id

    # Obtener el usuario creado
    Given path 'users', usuario_id
    When method Get
    Then status 200
    And match response.id == usuario_id
    And match response.email == payload.email

  Scenario: ActualizarUsuarioParcial (PATCH)
    * def payload = getPayload()
    # Crear primero
    Given path 'users'
    And request payload
    When method Post
    Then status 201
    * def usuario_id = response.id

    # Actualizar parcialmente
    Given path 'users', usuario_id
    And request { "name": "Updated Name Patch", "status": "inactive" }
    When method Patch
    Then status 200
    And match response.name == 'Updated Name Patch'
    And match response.status == 'inactive'

  Scenario: ActualizarUsuario (PUT)
    * def payload = getPayload()
    # Crear primero
    Given path 'users'
    And request payload
    When method Post
    Then status 201
    * def usuario_id = response.id

    # Actualizar totalmente
    Given path 'users', usuario_id
    And request { "name": "Updated Name Put", "email": #(payload.email), "gender": "female", "status": "inactive" }
    When method Put
    Then status 200
    And match response.name == 'Updated Name Put'
    And match response.gender == 'female'
    And match response.status == 'inactive'

  Scenario: EliminarUsuario
    * def payload = getPayload()
    # Crear primero
    Given path 'users'
    And request payload
    When method Post
    Then status 201
    * def usuario_id = response.id

    # Eliminar
    Given path 'users', usuario_id
    When method Delete
    Then status 204