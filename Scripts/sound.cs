using UnityEngine;
using System.Collections;

public class sound : MonoBehaviour {

	// Use this for initialization
	CharacterController cc;
	void Start () {
		cc = GetComponent<CharacterController>();
	}

	void Update () {
		
		if (Time.time > 20) {
			GetComponent<AudioSource> ().Play();
		}

	}
}