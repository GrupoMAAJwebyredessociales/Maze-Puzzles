using UnityEngine;
using System.Collections;

public class WalkScript : MonoBehaviour {

	// Use this for initialization
	CharacterController cc;
	void Start () {
		cc = GetComponent<CharacterController>();
	}

	// Update is called once per frame
	void Update () {
		/*if (GetComponent<AudioSource>().isPlaying == false)
		{
			GetComponent<AudioSource> ().volume = Random.Range (0.5f, 1);
			GetComponent<AudioSource> ().pitch = Random.Range (0.5f, 1);
			GetComponent<AudioSource>().Play();
		}*/
		GetComponent<AudioSource> ().volume = Random.Range (0.5f, 1);
		GetComponent<AudioSource> ().pitch = Random.Range (0.5f, 1);
		//GetComponent<AudioSource>().Play;
	}
}