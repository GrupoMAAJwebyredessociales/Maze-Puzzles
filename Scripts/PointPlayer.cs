using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PointPlayer : MonoBehaviour {

/*EXPLICACIÓN DEL USO DE ESTE SCRIPT:
 * Se crean gameObjects que se vayan a recolectar.
 * Se les quita la gravedad (riggivody)
 * En el collider se hacen trigger.
 * Se le aplica el Tag denominado "Collectable".
	*/
	public controladortiempo cntrl;
	/*void OnTriggerEnter(Collider other) 
	{
		if (other.gameObject.CompareTag ("Collectable"))
		{
			Destroy (other.gameObject);
			cntrl = FindObjectOfType (typeof(controladortiempo)) as controladortiempo;
			cntrl.sumarPuntos ();	
		}
	}*/
	public void OnControllerColliderHit(ControllerColliderHit hit)
	{
		//print (hit.gameObject.tag);
		if (hit.gameObject.CompareTag("avion"))
		{
			print("Avion");
		}
		if (hit.gameObject.CompareTag("pieces"))
		{
			print ("Pieza recogida");
			hit.gameObject.SetActive (false);
			Destroy (hit.gameObject);
			cntrl = FindObjectOfType (typeof(controladortiempo)) as controladortiempo;
			cntrl.sumarPuntos ();	
		}

	}/*
	void colision(GameObject hit){
		print (hit.tag);
		if (hit.CompareTag("avion"))
		{
			print("Colider entra a");
		}
		if (hit.CompareTag("pieces"))
		{
			cntrl = FindObjectOfType (typeof(controladortiempo)) as controladortiempo;
			cntrl.sumarPuntos ();
		}
	}*/
}
