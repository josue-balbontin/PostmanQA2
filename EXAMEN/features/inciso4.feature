# language: es
@inciso4
Característica: Inciso 4 - Mis Préstamos, devolver un libro y renovar con nueva fecha de 21 días

@devolverYRenovar21Dias
Escenario: Ingresar a la página, ver sección de Mis Préstamos, devolver un libro y renovar otro por 21 días
Dado que inicio sesión con el usuario "admin" y la contraseña "Admin123!"
Y verifico tener libros activos disponibles para la prueba
Cuando me dirijo a la sección de "Mis Préstamos"
Y verifico que la tabla de préstamos activos esté visible
Y realizo la devolución de un libro en préstamo
Y verifico que la devolución se registre correctamente
Y realizo la renovación del otro libro seleccionando una nueva fecha con "14" días de plazo
Entonces verifico que el valor de renovado se actualice a "1/1"
