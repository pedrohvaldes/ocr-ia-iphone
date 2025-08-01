import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt

# Carregar modelo treinado
model = tf.keras.models.load_model("model/az_letters_cnn.h5")

# Função para prever letra
def predict_letter(image):
    prediction = model.predict(np.expand_dims(image, axis=0))
    return chr(np.argmax(prediction) + ord('A'))  # Converte índice em letra

# Testar com algumas imagens do conjunto de teste
for i in range(5):
    img = X_test[i]
    true_label = chr(y_test[i] + ord('A'))
    predicted_label = predict_letter(img)
    
    plt.imshow(img.squeeze(), cmap="gray")
    plt.title(f"Verdadeiro: {true_label} | Previsto: {predicted_label}")
    plt.show()
