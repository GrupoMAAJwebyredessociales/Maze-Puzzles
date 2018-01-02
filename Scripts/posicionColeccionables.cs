using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class posicionColeccionables : MonoBehaviour {

	// Use this for initialization

	public int coleccionablesTotales;
    public GameObject scrippj;
    
	public int coleccionablesParaRecoger;
	private GameObject[] targets;
	private GameObject[] plane;
	private int rnd,eliminaciones;


	void Start () {
		chooseTarget ();
		planePieces ();
	}
	
	// Update is called once per frame
	void Update () {
        
    }
	void getModels(){
		
	}
	void chooseTarget(){

		createTargetArray ();
		eliminaciones = coleccionablesTotales-coleccionablesParaRecoger;
		for (int i = 0; i < eliminaciones; i++) {
			int aux = aleatorio (coleccionablesTotales);
			if (aux < targets.Length) {
				targets [aux].SetActive (false);
				Destroy (targets [aux]);
			}
		}

	}
	void planePieces() {
		createPiecesArray ();
		int index = 0;
		for (int i = 0; i < coleccionablesTotales; i++) {
			//print (i + "vector");
			//print (targets [i].activeSelf + "active");
			if (i < targets.Length) {
				if (targets [i].activeSelf) {
					//print (i + " if");
					if ((index < plane.Length) && (i < targets.Length)) {
						plane [index].transform.position = targets [i].transform.position;
					}

					index++;
					targets [i].SetActive (false);
				}
			}
		}
	}

	void createTargetArray(){

		targets = GameObject.FindGameObjectsWithTag ("Collectable");
		if (targets == null)
			print ("ERROR AL BUSCAR GAMEOBJECTS Collectable");
	}
	void createPiecesArray(){

		plane = GameObject.FindGameObjectsWithTag ("pieces");
		if (plane == null)
			print ("ERROR AL BUSCAR GAMEOBJECTS pieces");
	}

	public int aleatorio(int limite){
		rnd = Random.Range (0, limite);
		return rnd;
	}

}
