import tensorflow as tf
import coremltools as ct

# Carregar modelo Keras
model = tf.keras.models.load_model("model/az_letters_cnn.h5")

# Converter para CoreML
mlmodel = ct.convert(model)
mlmodel.save("model/az_letters_cnn.mlmodel")

print("Modelo exportado para CoreML com sucesso!")
