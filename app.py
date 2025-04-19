from flask import Flask, render_template, url_for

app = Flask(__name__)

# Ruta principal
@app.route('/')
def menu():
    return render_template('index.html')

# Pantalla de juego
@app.route('/juego')
def juego():
    return render_template('juego.html')

# Pantalla de selección de personaje
@app.route('/personajes')
def personajes():
    return render_template('personajes.html')

# Pantalla de configuración
@app.route('/configuracion')
def configuracion():
    return render_template('configuracion.html')

# Pantalla de logros
@app.route('/logros')
def logros():
    return render_template('logros.html')

@app.route('/operacion')
def operacion():
    return render_template('operacion.html')

@app.route('/modo')
def modo():
    return render_template('modo.html')

@app.route('/')
def intro():
    return render_template('intro.html')



# Ejecutar la app
if __name__ == '__main__':
    app.run(debug=True)
