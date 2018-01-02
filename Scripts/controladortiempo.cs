using System.Collections;
using System.Collections.Generic;
using UnityEngine.SceneManagement;
using UnityEngine;
using UnityEngine.UI;

[RequireComponent(typeof(AudioSource))]

public class controladortiempo : MonoBehaviour {
    float countdown = 800.0f;
    public int puntos = 0;
    public GameObject mapa;
    public string escena;
    GameObject aux;
    public GameObject pj;
    bool pulsado = false;
    
    bool tocandoavion;
	public GameObject plano;
   
   
    // Use this for initialization
    void Start () {
		plano.SetActive (false);
        tocandoavion = false;
        /*GetComponent<RawImage>().texture = movie  as MovieTexture;
        audio.clip= movie.audioClip;
        movie.Play();
        audio.Play();*/
        mapa.GetComponent<Renderer>().enabled = false;

    }
	
	// Update is called once per frame
	void Update () {
        countdown -= Time.deltaTime;



        

       
        
            
            
            
            
        







        
        if (Input.GetKeyDown(KeyCode.F))
        {
            
            
            if ((pulsado==false))
            {
                //print("llega mapa");
                // aux = Instantiate(mapa);
                //mapa.GetComponent<Renderer>().enabled = false;
				mapa.SetActive(false);
                pulsado = true;
            }
            else if(pulsado==true)
            {
                //mapa.GetComponent<Renderer>().enabled = true;
				mapa.SetActive(true);
                pulsado = false;
            }
            
        }


        if (countdown <= 0.0f)
        {
            SceneManager.LoadScene("Game Over");

           print("fin de la partida");
            countdown = 0f;
        }

       
        if((puntos>=8))
        {
            SceneManager.LoadScene(escena);
        }

       // aux.transform.rotation = Quaternion.LookRotation(-Camera.main.transform.forward, Camera.main.transform.up);
        //aux.transform.Rotate(-Camera.main.transform.forward.x, Camera.main.transform.up.z,0);
        //Vector3 a = new Vector3(pj.transform.position.x, pj.transform.position.y, pj.transform.position.z);
        //aux.transform.position = new Vector3(pj.transform.position.x, pj.transform.position.y, pj.transform.position.z + 10);
        /*
        aux.transform.position = new Vector3(pj.transform.position.x, pj.transform.position.y, pj.transform.position.z - 10);
        // pj.transform.LookAt(aux.transform.position);
        aux.transform.rotation = Quaternion.LookRotation(-Camera.main.transform.forward, Camera.main.transform.up);
        */

		if (Input.GetKey (KeyCode.Escape))
			plano.SetActive (true);
		if ((Input.GetKey (KeyCode.Y)) && (plano.activeSelf == true)) {
			plano.SetActive (false);
			SceneManager.LoadScene ("Game Over", LoadSceneMode.Single);
		} else if ((Input.GetKey (KeyCode.N)) && (plano.activeSelf == true)) {
			plano.SetActive (false);
		}
    
	
	}

	public void sumarPuntos(){
		print ("sumando punto");
		puntos++;
	}

    void OnGUI()
    {
        
            
         var style = new GUIStyle { fontSize = 48, fontStyle = FontStyle.Normal };

        //GUI.Label(new Rect(Screen.width - Screen.width / 6, 0, Screen.width, Screen.height), "s left ",style);
        GUI.Label(new Rect(Screen.width - Screen.width / 5, Screen.height/8, Screen.width, Screen.height), puntos.ToString() + "/8", style);
        GUI.Label(new Rect(Screen.width-Screen.width/5, 0, 100, 100), Mathf.Round(countdown).ToString(),style);
            GUI.color = Color.white;
    }

    void OnTriggerEnter(Collider other)
    {
        if (!other.gameObject.CompareTag("Collectable"))
        {
            sumarPuntos();
        }
    }
}

