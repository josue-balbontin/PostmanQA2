# language: es
@inciso2
Característica: Inciso 2 - Ver detalle de un libro y realizar préstamo por 18 días

  @prestamo18Dias
  Escenario: Ingresar a la página, ver detalle de un libro y realizar el préstamo por 18 días
    Dado que inicio sesión con el usuario "jperez" y la contraseña "Lector123!"
    Y verifico que me encuentro en el catálogo de libros
    Cuando selecciono ver detalle del primer libro disponible
    Y verifico que la información del libro y la opción de prestar estén visibles
    Y realizo el préstamo del libro seleccionando un plazo de "18" días
    Entonces verifico que el préstamo se registre exitosamente
