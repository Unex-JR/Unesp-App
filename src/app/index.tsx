import { getUserById, insertUser } from "@/db/repositories/usersRepository";
import { NewUser } from "@/db/schema/users";
import { StyleSheet, Text, View } from "react-native";

async function testInsertAndFetchUser(): Promise<void> {
  try {
    const mockUser: NewUser = {
      name: "joao",
      email: "joao@gmail.com",
      currentSemester: 5,
    };

    console.log("Teste de inserção e leitura de usuário mock:");
    console.log(mockUser);

    const insertedUser = await insertUser(mockUser);
    const insertedId = insertedUser?.id;

    if (!insertedId) {
      throw new Error("Falha ao obter o ID do usuário inserido");
    }

    console.log("Usuário inserido com sucesso, id: ", insertedId);
    console.log("Buscando no banco...");

    const fetchedUser = await getUserById(insertedId);
    if (!fetchedUser) {
      throw new Error("Usuário inserido não foi encontrado pelo ID");
    }

    console.log("Usuário retornado pelo banco: ", fetchedUser);

    if (
      fetchedUser.email === mockUser.email &&
      fetchedUser.name === mockUser.name
    ) {
      console.log("Sucesso, usuário inserido e buscado corretamente");
    } else {
      console.warn(
        "Usuário foi encontrado, porém com dados diferentes do mock original",
      );
    }
  } catch (error) {
    console.error("Ocorreu um erro durante o teste: ", error);
  }
}

export default function Index() {
  testInsertAndFetchUser();
  return (
    <View style={styles.container}>
      <Text>Edit src/app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
