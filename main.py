import tensorflow as tf

print("TensorFlow version:", tf.__version__)

# Teste rápido: criar uma constante e rodar
hello = tf.constant("Hello, TensorFlow!")
tf.print(hello)
