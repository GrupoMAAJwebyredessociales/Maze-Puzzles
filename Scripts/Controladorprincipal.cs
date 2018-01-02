using System.Collections;
using System.Collections.Generic;
using UnityEngine.SceneManagement;
using UnityEngine;

public class Controladorprincipal : MonoBehaviour {

    public void CambiarEscena(string nombre)
    {
        print("Hola");
        SceneManager.LoadScene(nombre);
    }
    public void Salir()
    {
        Application.Quit();
    }

	public void Update(){

	}
}
