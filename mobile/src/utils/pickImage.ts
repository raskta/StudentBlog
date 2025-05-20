import { launchImageLibrary } from "react-native-image-picker";
import { PermissionsAndroid, Platform } from "react-native";

type ImageResult = {
  success: boolean;
  image?: {
    uri: string;
    type: string;
    name: string;
  };
  error?: string;
};

export const pickImage = async (): Promise<ImageResult> => {
  try {
    // Verificar permissões no Android
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        {
          title: "Permissão para acessar a galeria",
          message: "Precisamos acessar suas fotos para selecionar uma imagem",
          buttonNeutral: "Perguntar depois",
          buttonNegative: "Cancelar",
          buttonPositive: "OK",
        }
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        return {
          success: false,
          error: "Permissão para acessar a galeria negada",
        };
      }
    }

    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.8,
      selectionLimit: 1,
    });

    // Tratar cancelamento
    if (result.didCancel) {
      return { success: false, error: "Seleção cancelada" };
    }

    // Tratar erros
    if (result.errorCode || result.errorMessage) {
      return {
        success: false,
        error: result.errorMessage || "Erro desconhecido ao selecionar imagem",
      };
    }

    // Verificar se há imagem válida
    if (!result.assets || result.assets.length === 0) {
      return { success: false, error: "Nenhuma imagem selecionada" };
    }

    const asset = result.assets[0];
    return {
      success: true,
      image: {
        uri: asset.uri!,
        type: asset.type || "image/jpeg",
        name: asset.fileName || `image_${Date.now()}`,
      },
    };
  } catch (error) {
    console.error("Erro ao selecionar imagem:", error);
    return {
      success: false,
      error: "Erro inesperado ao acessar a galeria",
    };
  }
};
