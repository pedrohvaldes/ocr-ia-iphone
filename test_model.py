import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt

# Carregar modelo treinado
model = tf.keras.models.load_model("model/az_letters_cnn.h5")

# Carregar conjuntos de teste salvos
X_test = np.load("model/X_test.npy")
y_test = np.load("model/y_test.npy")

# Função para prever letra
def predict_letter(image):
    prediction = model.predict(np.expand_dims(image, axis=0))
    return chr(np.argmax(prediction) + ord('A'))

# Testar com algumas imagens
for i in range(5):
    img = X_test[i]
    true_label = chr(int(y_test[i]) + ord('A'))  # Conversão para int
    predicted_label = predict_letter(img)
    
    plt.imshow(img.squeeze(), cmap="gray")
    plt.title(f"Verdadeiro: {true_label} | Previsto: {predicted_label}")
    plt.show()
