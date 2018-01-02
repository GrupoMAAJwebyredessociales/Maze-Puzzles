using System.Collections;
using System.Collections.Generic;
using UnityEngine.SceneManagement;
using UnityEngine;

public class controladortransicion : MonoBehaviour {

    public float countdown;
    public string escena;
    public string texto;
    // Use this for initialization
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        countdown -= Time.deltaTime;
        if (countdown <= 0.0f)
        {
            SceneManager.LoadScene(escena);

            
            countdown = 0f;
        }
    }
    void OnGUI()
    {


        var style = new GUIStyle { fontSize = 48, fontStyle = FontStyle.Normal };

        //GUI.Label(new Rect(Screen.width - Screen.width / 6, 0, Screen.width, Screen.height), "s left ",style);
        GUI.Label(new Rect(Screen.width - Screen.width, Screen.height / 8, Screen.width, Screen.height), texto, style);

        GUI.color = Color.white;
    }
}
