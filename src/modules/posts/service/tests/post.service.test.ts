import { postService } from "../posts.service";
import {
  postCreate,
  postUpdate,
  deletePost,
} from "../../repository/posts.repository";
import { getUserById } from "../../../users/repository/users.repository";
import { CustomError } from "../../../../utils/error/custom.error";

jest.mock("../../repository/posts.repository", () => ({
  postCreate: jest.fn(),
  postUpdate: jest.fn(),
  deletePost: jest.fn(),
}));

jest.mock("../../../users/repository/users.repository", () => ({
  getUserById: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("PostService - create", () => {
  test("deve criar um post com sucesso", async () => {
    const mockPost = {
      titulo: "Título Teste",
      conteudo: "Conteúdo Teste",
      idusuario: 1,
    };

    const mockUser = {
      id: 1,
      nome: "Usuário Teste",
      email: "email@email.com",
    };

    const mockCreatedPost = {
      ...mockPost,
      id: 1,
      usuario: mockUser,
      dtcriacao: new Date(),
    };

    // Mock do `getUserById`
    (getUserById as jest.Mock).mockResolvedValue(mockUser);

    // Mock do `postCreate`
    (postCreate as jest.Mock).mockResolvedValue(mockCreatedPost);

    const result = await postService.create(mockPost);

    expect(getUserById).toHaveBeenCalledWith(mockPost.idusuario);

    expect(postCreate).toHaveBeenCalledWith({
      ...mockPost,
      usuario: mockUser,
    });
    expect(result).toEqual(mockCreatedPost);
  });

  test("deve lançar um erro se o usuário não existir", async () => {
    const mockPost = {
      titulo: "Título Teste 2",
      conteudo: "Conteúdo Teste 2",
      idusuario: 999, // Usuário inexistente
    };

    // Mock do `getUserById` para retornar `null`
    (getUserById as jest.Mock).mockResolvedValue(null);

    await expect(postService.create(mockPost)).rejects.toThrow(
      new CustomError(`Usuário com id ${mockPost.idusuario} não existe`, 400)
    );

    expect(getUserById).toHaveBeenCalledWith(mockPost.idusuario);
    expect(postCreate).not.toHaveBeenCalled();
  });

  test("deve lançar um erro se o título ou conteúdo não forem informados", async () => {
    const mockPost = {
      titulo: "",
      conteudo: "",
      idusuario: 1,
    };

    (getUserById as jest.Mock).mockResolvedValue(mockPost);

    await expect(postService.create(mockPost)).rejects.toThrow(
      new CustomError("Título e conteúdo são obrigatórios", 400)
    );

    expect(getUserById).toHaveBeenCalledWith(mockPost.idusuario);
    expect(postCreate).not.toHaveBeenCalled();
  });
});

describe("PostService - update", () => {
  test("deve atualizar um post com sucesso", async () => {
    const mockPostId = 1;

    const mockPostUpdate = {
      titulo: "Alterando o título",
      subtitulo: "Alterando Subtítulo",
      conteudo: "Conteúdo do Post",
      idusuario: 1,
    };

    const mockExistingPost = {
      id: mockPostId,
      titulo: "Título Antigo",
      subtitulo: "Subtítulo Antigo",
      conteudo: "Conteúdo Antigo",
      usuario: {
        id: 1,
        nome: "Usuário Teste",
        email: "test@test.com",
        role: "Aluno" as "Aluno" | "Professor",
        ativo: true,
      },
      dtcriacao: new Date(),
    };

    const mockUpdatedPost = {
      ...mockExistingPost,
      ...mockPostUpdate,
    };

    jest.spyOn(postService, "getById").mockResolvedValue(mockExistingPost);
    (postUpdate as jest.Mock).mockResolvedValue(mockUpdatedPost);

    const result = await postService.update(mockPostId, mockPostUpdate);

    expect(postService.getById).toHaveBeenCalledWith(mockPostId);
    expect(postUpdate).toHaveBeenCalledWith(mockPostId, mockPostUpdate);
    expect(result).toEqual(mockUpdatedPost);
  });

  test("deve lançar um erro se o post não for encontrado", async () => {
    const mockPostId = 999;
    const mockPostUpdate = {
      titulo: "Título Atualizado",
      conteudo: "Conteúdo Atualizado",
      idusuario: 1,
    };

    jest
      .spyOn(postService, "getById")
      .mockRejectedValue(
        new CustomError(`Post com id ${mockPostId} não encontrado`, 404)
      );

    await expect(
      postService.update(mockPostId, mockPostUpdate)
    ).rejects.toThrow(
      new CustomError(`Post com id ${mockPostId} não encontrado`, 404)
    );

    expect(postService.getById).toHaveBeenCalledWith(mockPostId);
    expect(postUpdate).not.toHaveBeenCalled();
  });
});

describe("PostService - delete", () => {
  test("deve deletar um post com sucesso", async () => {
    const mockPostId = 1;

    const mockExistingPost = {
      id: mockPostId,
      titulo: "Título Antigo",
      subtitulo: "Subtítulo Antigo",
      conteudo: "Conteúdo Antigo",
      usuario: {
        id: 1,
        nome: "Usuário Teste",
        email: "test@test.com",
        role: "Aluno" as "Aluno" | "Professor",
        ativo: true,
      },
      dtcriacao: new Date(),
    };

    jest.spyOn(postService, "getById").mockResolvedValue(mockExistingPost);
    (deletePost as jest.Mock).mockResolvedValue(undefined);

    const result = await postService.delete(mockPostId);

    expect(postService.getById).toHaveBeenCalledWith(mockPostId);
    expect(deletePost).toHaveBeenCalledWith(mockPostId);
    expect(result).toEqual({
      message: `Post com id ${mockPostId} deletado com sucesso`,
    });
  });

  test("deve lançar um erro se o post não for encontrado", async () => {
    const mockPostId = 999;

    jest
      .spyOn(postService, "getById")
      .mockRejectedValue(
        new CustomError(`Post com id ${mockPostId} não encontrado`, 404)
      );

    await expect(postService.delete(mockPostId)).rejects.toThrow(
      new CustomError(`Post com id ${mockPostId} não encontrado`, 404)
    );

    expect(postService.getById).toHaveBeenCalledWith(mockPostId);
    expect(deletePost).not.toHaveBeenCalled();
  });
});
